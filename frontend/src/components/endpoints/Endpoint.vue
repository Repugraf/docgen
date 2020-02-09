<template>
  <div class="endpoint" :class="data.method.toLowerCase()">
    <div class="endpoint-heading" :class="{closed:!showMenu}" @click.self="showMenu=!showMenu">
      <div class="method" @click="showMenu=!showMenu">
        <span>{{data.method}}</span>
      </div>
      <div class="url" @click="showMenu=!showMenu">
        <span>{{data.url}}</span>
      </div>
      <router-link class="edit" v-if="!isPublic" :to="`/endpoint/${data._id}`">
        <div class="icn">
          <Edit />
        </div>
      </router-link>
      <div class="icn" @click="openConfirmDeleteModal" v-if="!isPublic">
        <Cross color="red" />
      </div>
    </div>
    <div v-if="showMenu" class="endpoint-menu">
      <EndpointData :data="data" />
    </div>
  </div>
</template>

<script>
import Cross from "../dynamic-icons/Cross";
import Edit from "../dynamic-icons/Edit";
import EndpointData from "./EndpointData";
export default {
  props: ["data"],
  components: {
    Cross,
    Edit,
    EndpointData
  },
  data() {
    return {
      showMenu: false
    };
  },
  computed: {
    isPublic() {
      return this.$route.name === "public";
    }
  },
  methods: {
    async deleteEndpoint(id) {
      if (!id) return;
      await this.$store.dispatch("endpoints/deleteEndpoint", id);
      await this.$store.dispatch("endpoints/getEndpointsByFilter", {
        project_id: this.$route.params.id
      });
    },
    openConfirmDeleteModal() {
      if (confirm("Are you sure?")) this.deleteEndpoint(this.data._id);
    }
  }
};
</script>