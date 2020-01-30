<template>
  <div v-if="projects">
    <div
      v-for="item of projects"
      :key="item._id"
      @click="setCurrentProject(item)"
      style="cursor:pointer;"
    >
      <span style="color: blue;">{{item.name}}</span>
    </div>
    <pre>{{projects}}</pre>
  </div>
</template>

<script>
export default {
  computed: {
    projects() {
      return this.$store.state.projects.projectList;
    }
  },
  methods: {
    setCurrentProject(project) {
      if (!project) return;
      this.$store.commit("projects/setCurrentProject", project);
    }
  }
};
</script>

<style>
</style>