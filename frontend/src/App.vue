<template>
  <div id="app">
    <NavBar />
    <ModalHandler />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import ModalHandler from "./components/modals/ModalHandler";
import { getAuthAxios } from "./util/auth";

export default {
  name: "app",
  components: {
    NavBar,
    ModalHandler
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(1)
      this.$store.commit("auth/setToken", token);
      this.$store.commit("setAxios", getAuthAxios(token));
    }
  }
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>