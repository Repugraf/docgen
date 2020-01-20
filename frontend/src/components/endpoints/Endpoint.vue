<template>
  <div class="endpoint" :class="data.method.toLowerCase()">
    <div class="endpoint-heading" :class="{closed:!showMenu}" @click.self="showMenu=!showMenu">
      <div class="method">
        <span>{{data.method}}</span>
      </div>
      <div class="url">
        <span>{{data.url}}</span>
      </div>
      <router-link class="edit" v-if="!editMode" :to="`/endpoint/${data._id}`">
        <div class="icn">
          <Edit />
        </div>
      </router-link>
      <div class="icn" :class="{edit: editMode}" @click="openConfirmDeleteModal">
        <Cross color="red" />
      </div>
    </div>
    <div v-if="showMenu" class="endpoint-menu">
      <EndpointData :data="data"/>
    </div>
  </div>
</template>

<script>
import Cross from "../dynamic-icons/Cross";
import Edit from "../dynamic-icons/Edit";
import EndpointData from "./EndpointData";
export default {
  props: ["data", "editMode"],
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
  methods: {
    async deleteEndpoint(id) {
      if (!id) return;
      await this.$store.dispatch("endpoints/deleteEndpoint", id);
      const targetUrl = "/endpoints";
      if (this.$route.path !== targetUrl) return this.$router.push(targetUrl);
      await this.$store.dispatch("endpoints/getEndpoints");
    },
    openConfirmDeleteModal() {
      if (confirm("Are you sure?")) this.deleteEndpoint(this.data._id);
    }
  }
};
</script>