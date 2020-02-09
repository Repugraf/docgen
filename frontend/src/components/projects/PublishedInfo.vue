<template>
  <p v-if="isPublished">
    the published project can be accessed by this link
    <a
      target="_blank"
      :href="publishedProjectLink"
    >{{publishedProjectLink}}</a>
  </p>
</template>

<script>
export default {
  props: ["project"],
  computed: {
    isPublished() {
      return !!this.project.published;
    },
    publishedProjectLink() {
      return `${window.location.origin}/public/${this.project._id}`;
    }
  }
};
</script>