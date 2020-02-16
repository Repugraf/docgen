<template>
  <div id="app">
    <Loading />
    <notifications group="error" position="top center" />
    <notifications group="success" position="bottom left" />
    <NavBar />
    <ModalHandler />
    <router-view />
  </div>
</template>

<script>
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import ModalHandler from "./components/modals/ModalHandler";
import { getAuthAxios } from "./util/auth";

export default {
  name: "app",
  components: {
    NavBar,
    ModalHandler,
    Loading
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$store.commit("auth/setToken", token);
      this.$store.commit("setAxios", getAuthAxios(token));
    }
  },
  async beforeMount() {
    if (this.$store.getters["auth/isAuthenticated"])
      await this.$store.dispatch("auth/getUser");
  }
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>