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