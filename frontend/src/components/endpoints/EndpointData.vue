<template>
  <div class="endpoint-data">
    <!-- <pre>{{data}}</pre> -->
    <div class="request-body" v-if="data.requestBody">
      request
      <pre>{{data.requestBody}}</pre>
    </div>
    <div class="response-body" v-if="data.responseBody">
      response
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
.endpoint-data {
  pre {
    overflow: auto;
  }
  .endpoint-data {
  }
}
</style>