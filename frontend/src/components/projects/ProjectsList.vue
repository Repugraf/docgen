<template>
  <div v-if="projects" class="projects-list-container">
    <div
      v-for="item of projects"
      :key="item._id"
      style="cursor:pointer;"
    >
      <router-link :to="`/project/${item._id}`">
        <h3>{{item.name}}</h3>
      </router-link>
    </div>
    <!-- <pre>{{projects}}</pre> -->
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

<style lang="scss" scoped>
.projects-list-container {
  margin: 2rem 0;
}
</style>