<template>
  <div id="app">
    <EndpointsContainer />
  </div>
</template>

<script>
import EndpointsContainer from "./components/endpoints/EndpointsContainer";

export default {
  name: "app",
  components: {
    EndpointsContainer
  }
};
</script>

<style lang="scss">
@import "./assets/main.scss";
</style>