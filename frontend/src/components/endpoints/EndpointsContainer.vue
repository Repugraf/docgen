<template>
  <div style="margin:0.625rem 0;">
    <EndpointsList />
    <button
      v-if="!isPublic"
      class="btn btn-submit"
      @click="$store.commit('setModal', 'CreateEndpointModal')"
    >add endpoint</button>
  </div>
</template>

<script>
import EndpointsList from "./EndpointsList";

export default {
  components: {
    EndpointsList
  },
  computed: {
    isPublic() {
      return this.$route.name === "public";
    }
  }
};
</script>