<template>
  <a
    class="nav-dropdown"
    v-if="isAuth"
    style="margin-left: auto;"
    tabindex="1"
    @blur="display=false"
  >
    <div class="dropdown-button" @click="display=!display">
      account
      <div class="arrow-down"></div>
    </div>
    <div class="dropdown-menu" v-if="display">
      <a class="router-link" @click="logout">logout</a>
    </div>
  </a>
</template>

<script>
export default {
  props: ["isAuth"],
  data() {
    return {
      display: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit("auth/setToken", null);
      if (this.$route.path !== "login") this.$router.push("/login");
    }
  }
};
</script>