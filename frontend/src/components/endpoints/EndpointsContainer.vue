<template>
  <div class="endpoints-container">
    <EndpointsList />
    <AddEndpoint />
  </div>
</template>

<script>
import EndpointsList from "./EndpointsList";
import AddEndpoint from "./AddEndpoint";

export default {
  components: {
    EndpointsList,
    AddEndpoint
  }
};
</script>

<style lang="scss" scoped>
.endpoints-container {
  margin: 0.625rem;
}
</style>