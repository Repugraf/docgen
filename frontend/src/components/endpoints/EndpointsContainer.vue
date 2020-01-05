<template>
  <div class="endpoints-container">
    <EndpointsList />
    <AddEndpointBtn />
  </div>
</template>

<script>
import EndpointsList from "./EndpointsList";
// import AddEndpoint from "./AddEndpoint";
import AddEndpointBtn from "./AddEndpointBtn";

export default {
  components: {
    EndpointsList,
    AddEndpointBtn
  }
};
</script>

<style lang="scss" scoped>
.endpoints-container {
  margin: 0.625rem;
}
</style>