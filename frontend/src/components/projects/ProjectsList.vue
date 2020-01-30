<template>
  <div>
    <pre v-if="projects">{{projects}}</pre>
  </div>
</template>

<script>
export default {
computed: {
    projects() {
      return this.$store.state.projects.projectList;
    }
  },
}
</script>

<style>

</style>