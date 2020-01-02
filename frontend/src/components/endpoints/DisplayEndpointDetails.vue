<template>
  <div class="endpoint-display-menu">
    <pre>{{data}}</pre>
    <div class="json-container">
      <pre>{{data.requestBody}}</pre>
    </div>
    <div class="json-container">
      <pre>{{data.responseBody}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="scss" scoped>
.endpoint-display-menu {
  .json-container {
  }
}
</style>