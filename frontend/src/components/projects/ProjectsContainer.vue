<template>
  <div class="page-container">
    <ProjectsList/>
    <button
      class="btn btn-submit"
      @click="$store.commit('setModal', 'CreateProjectModal')"
    >create project</button>
  </div>
</template>

<script>
import ProjectsList from "./ProjectsList";
export default {
  components: {
    ProjectsList
  },
  async created() {
    await this.$store.dispatch("projects/getProjects");
  }
};
</script>

<style>
</style>