<template>
  <nav class="nav-bar">
    <div class="links-container">
      <router-link to="/projects" class="router-link" v-if="isAuth">
        <div>projects</div>
      </router-link>
      <router-link
        :to="`/project/${currentProject._id}`"
        class="router-link"
        v-if="isAuth && currentProject"
      >
        <div>{{currentProject.name}}</div>
      </router-link>
      <router-link to="/about" class="router-link">
        <div>about</div>
      </router-link>
      <router-link to="/login" class="router-link" v-if="!isAuth">
        <div>login</div>
      </router-link>
      <NavAccountDropdown :isAuth="isAuth"/>
    </div>
  </nav>
</template>

<script>
import NavAccountDropdown from "./NavAccountDropdown";
export default {
  components: {
    NavAccountDropdown
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    currentProject() {
      return this.$store.state.projects.currentProject;
    }
  }
};
</script>