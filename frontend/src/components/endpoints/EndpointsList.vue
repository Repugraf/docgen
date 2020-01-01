<template>
  <div v-if="endpoints">
    <Endpoint v-for="data in endpoints" :key="data._id" :data="data" />
  </div>
</template>

<script>
import Endpoint from "./Endpoint";

export default {
  components: {
    Endpoint
  },
  computed: {
    endpoints() {
      return this.$store.state.endpoints.endpointsList;
    }
  },
  async created() {
    await this.$store.dispatch("endpoints/getEndpoints");
  }
};
</script>