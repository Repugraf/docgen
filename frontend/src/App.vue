<template>
  <div id="app">
    <jsoneditor v-model="json"/>
  </div>
</template>

<script>
import jsoneditor from "./components/jsoneditor";

export default {
  name: 'app',
  data() {
    return {
      json: {}
    }
  },
  components: {
    jsoneditor
  }
}
</script>

<style lang="scss">
@import "./assets/main.scss";
</style>