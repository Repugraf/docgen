<template>
  <div>
    <h1>{{project.name}}</h1>
    <p>{{project.description}}</p>
    <div class="controlls-container" v-if="!isPublic">
      <button
        class="btn btn-submit2"
        @click="$router.push(`/project-edit/${$route.params.id}`)"
      >edit project</button>
      <button class="btn btn-cancel" @click="deleteProject">delete project</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["project"],
  computed: {
    isPublic() {
      return this.$route.name === "public";
    }
  },
  methods: {
    async deleteProject() {
      if (confirm('Are you sure?')) {
        await this.$store.dispatch(
          "projects/deleteProject",
          this.$route.params.id
        );
        this.$router.push("/projects");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.controlls-container {
  padding: 1rem 0;
  display: flex;
  :first-child {
    margin-right: 1rem;
  }
  :last-child {
    margin-left: 1rem;
  }
}
</style>