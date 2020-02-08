<template>
  <div class="page-container" v-if="currentProject">
    <div>
      <h1>{{currentProject.name}}</h1>
      <p>{{currentProject.description}}</p>
    </div>
    <EndpointsContainer />
    <PublishHandler v-if="!isPublic" />
    <PublishedInfo v-if="!isPublic" :project="currentProject" />
  </div>
</template>

<script>
import EndpointsContainer from "../endpoints/EndpointsContainer";
import PublishHandler from "./PublishHandler";
import PublishedInfo from "./PublishedInfo";
export default {
  components: {
    EndpointsContainer,
    PublishHandler,
    PublishedInfo
  },
  computed: {
    currentProject() {
      if (this.isPublic) return this.$store.state.public.publicProject;
      return this.$store.state.projects.currentProject;
    },
    isPublic() {
      return this.$route.name === "public";
    }
  },
  async created() {
    if (this.isPublic)
      await this.$store.dispatch(
        "public/getPublicProject",
        this.$route.params.id
      );
    else
      await this.$store.dispatch("projects/getProject", this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
</style>