<template>
  <div class="page-container" v-if="currentProject">
    <ProjectHeading :project="currentProject"/>
    <EndpointsContainer />
    <PublishHandler v-if="!isPublic" />
    <PublishedInfo v-if="!isPublic" :project="currentProject" />
  </div>
</template>

<script>
import EndpointsContainer from "../endpoints/EndpointsContainer";
import PublishHandler from "./PublishHandler";
import PublishedInfo from "./PublishedInfo";
import ProjectHeading from "./ProjectHeading";
export default {
  components: {
    EndpointsContainer,
    PublishHandler,
    PublishedInfo,
    ProjectHeading
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