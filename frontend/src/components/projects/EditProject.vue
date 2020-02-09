<template>
  <div v-if="project && tempProject" class="page-container">
    <div class="form-field">
      <label>
        <span>Name</span>
        <input type="text" v-model="tempProject.name" class="custom-input" />
      </label>
    </div>
    <div class="form-field">
      <label>
        <span>Description</span>
        <textarea v-model="tempProject.description" class="custom-input"></textarea>
      </label>
    </div>
    <button class="btn btn-submit" :disabled="!wasChanged" @click="update">update</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempProject: null
    };
  },
  computed: {
    project() {
      return this.$store.state.projects.currentProject;
    },
    wasChanged() {
      return JSON.stringify(this.project) !== JSON.stringify(this.tempProject);
    }
  },
  methods: {
    async update() {
      if (!this.wasChanged) return;
      await this.$store.dispatch("projects/updateProject", this.tempProject);
      await this.$store.dispatch("projects/getProject", this.$route.params.id);
    }
  },
  async created() {
    await this.$store.dispatch("projects/getProject", this.$route.params.id);
    this.tempProject = JSON.parse(JSON.stringify(this.project));
  }
};
</script>

<style lang="scss" scoped>
.form-field {
  margin-top: 2rem;
  label > :not(span) {
    margin-top: 0.7rem;
  }
}
input,
textarea {
  width: 100%;
  box-sizing: border-box;
}
textarea {
  margin: 0;
  resize: none;
  min-height: 5rem;
  border: none;
}
button {
  margin-top: 1.5rem;
  height: 3rem;
}
</style>