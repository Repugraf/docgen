<template>
  <div id="app">
    <EndpointsList/>
  </div>
</template>

<script>
import EndpointsList from "./components/endpoints/EndpointsList";

export default {
  name: "app",
  components: {
    EndpointsList
  }
};
</script>

<style lang="scss">
@import "./assets/main.scss";
</style>