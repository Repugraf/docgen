<template>
  <div id="app">
    <pre>{{endpoints}}</pre>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      endpoints: null
    };
  },
  async created() {
    const endpoints = await axios.get(
      this.$store.state.globals.GET_ALL_ENDPOINTS_URL
    );
    this.endpoints = JSON.stringify(endpoints.data, null, 2);
  }
};
</script>

<style lang="scss">
@import "./assets/main.scss";
</style>