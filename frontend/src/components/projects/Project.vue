<template>
  <div class="page-container">
    <pre>{{currentProject}}</pre>
    <div>
      <h1>{{currentProject.name}}</h1>
      <p>{{currentProject.description}}</p>
    </div>
    <EndpointsContainer />
  </div>
</template>

<script>
import EndpointsContainer from "../endpoints/EndpointsContainer";
export default {
  components: {
    EndpointsContainer
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