<template>
    <EditEndpoint :data="endpoint" v-if="endpoint"/>
</template>

<script>
import EditEndpoint from "./EditEndpoint";
export default {
  components: {
    EditEndpoint
  },
  computed: {
    endpoint() {
      return this.$store.state.endpoints.currentEndpoint;
    }
  },
  async created() {
    await this.$store.dispatch(
      "endpoints/getOneEndpoint",
      this.$route.params.id
    );
  },
  destroyed() {
    this.$store.commit("endpoints/setCurrentEndpoint");
  }
};
</script>