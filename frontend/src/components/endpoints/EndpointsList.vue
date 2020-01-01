<template>
  <pre>{{endpoints}}</pre>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    endpoints: {
      get() {
        return this.$store.state.endpoints.endpointsList;
      },
      set(value) {
        this.$store.commit("setEndpoint", value, { module: "endpoints" });
      }
    }
  },
  async created() {
    const endpoints = await axios.get(
      this.$store.state.globals.GET_ALL_ENDPOINTS_URL
    );
    this.endpoints = endpoints.data;
  }
};
</script>