<template>
  <div class="endpoints-container">
    <EndpointsList />
    <button
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
  }
};
</script>

<style lang="scss" scoped>
.endpoints-container {
  max-width: 1200px;
  margin: 1rem auto;
  @media (max-width: 1220px) {
    margin: 1rem;
  }
}
</style>