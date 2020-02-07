<template>
  <div class="page-container">
    <div v-if="currentProject">
      <h1>{{currentProject.name}}</h1>
      <p>{{currentProject.description}}</p>
    </div>
    <EndpointsContainer />
    <PublishHandler v-if="currentProject"/>
  </div>
</template>

<script>
import EndpointsContainer from "../endpoints/EndpointsContainer";
import PublishHandler from "./PublishHandler";
export default {
  components: {
    EndpointsContainer,
    PublishHandler
  },
  computed: {
    currentProject() {
      return this.$store.state.projects.currentProject;
    }
  },
  async created() {
    await this.$store.dispatch("projects/getProject", this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
</style>