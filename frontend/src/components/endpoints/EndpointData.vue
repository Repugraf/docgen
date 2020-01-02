<template>
  <div v-if="endpoint">
    <Endpoint :data="endpoint"/>
  </div>
</template>

<script>
import Endpoint from "./Endpoint";
export default {
  components: {
    Endpoint
  },
  computed: {
    endpoint() {
      return this.$store.state.endpoints.currentEndpoint;
    }
  },
  async created() {
    await this.$store.dispatch("endpoints/getOneEndpoint", this.$route.params.id);
  },
  destroyed() {
    this.$store.commit("endpoints/setCurrentEndpoint");
  }
};
</script>

<style>
</style>