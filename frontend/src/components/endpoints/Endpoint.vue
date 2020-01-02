<template>
  <div class="endpoint" :class="data.method.toLowerCase()">
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
    <div class="icn" :class="{edit: editMode}" @click="deleteEndpoint(data._id)">
      <Cross color="red" />
    </div>
  </div>
</template>

<script>
import Cross from "../dynamic-icons/Cross";
import Edit from "../dynamic-icons/Edit";
export default {
  props: ["data", "editMode"],
  components: {
    Cross,
    Edit
  },
  methods: {
    async deleteEndpoint(id) {
      if (!id) return;
      await this.$store.dispatch("endpoints/deleteEndpoint", id);
      await this.$store.dispatch("endpoints/getEndpoints");
    }
  }
};
</script>