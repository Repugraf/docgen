<template>
  <div id="app">
    <NavBar/>
    <ModalHandler/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import ModalHandler from "./components/modals/ModalHandler";

export default {
  name: "app",
  components: {
    NavBar,
    ModalHandler
  }
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>