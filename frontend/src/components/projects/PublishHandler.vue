<template>
  <div>
    <button class="btn btn-submit2" @click="publish" v-if="!isPublished">publish</button>
    <button class="btn btn-cancel" @click="unpublish" v-else-if="isPublished">unpublish</button>
  </div>
</template>

<script>
export default {
  computed: {
    currentProject() {
      return this.$store.state.projects.currentProject;
    },
    isPublished() {
      return !!this.currentProject && !!this.currentProject.published;
    }
  },
  methods: {
    async publish() {
      await this.$store.dispatch("projects/updateProject", {
        _id: this.$route.params.id,
        published: true
      });
      await this.$store.dispatch("projects/getProject", this.$route.params.id);
    },
    async unpublish() {
      await this.$store.dispatch("projects/updateProject", {
        _id: this.$route.params.id,
        published: false
      });
      await this.$store.dispatch("projects/getProject", this.$route.params.id);
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  margin-top: 1rem;
  min-height: 2.5rem;
}
</style>