<template>
  <div class="endpoints-container" v-if="endpoint">
    <Endpoint :data="endpoint" :editMode="true"/>
    <DisplayEndpointDetails :data="endpoint"/>
  </div>
</template>

<script>
import Endpoint from "./Endpoint";
import DisplayEndpointDetails from "./DisplayEndpointDetails";
export default {
  components: {
    Endpoint,
    DisplayEndpointDetails
  },
  computed: {
    endpoint() {
      return this.$store.state.endpoints.currentEndpoint;
    }
  },
  async created() {
    await this.$store.dispatch("endpoints/getOneEndpoint", this.$route.params.id);
  },
  destroyed() {
    this.$store.commit("endpoints/setCurrentEndpoint");
  }
};
</script>