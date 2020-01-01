<template>
  <pre>{{endpoints}}</pre>
</template>

<script>
export default {
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