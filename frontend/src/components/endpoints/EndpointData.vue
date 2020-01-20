<template>
  <div class="endpoint-data">
    <div style="margin:1rem 0;" v-if="data.description">{{data.description}}</div>
    <div class="request-body" v-if="data.requestBody">
      <div class="field-heading">request</div>
      <DataVisualiser :data="data.requestBody" />
    </div>
    <div class="response-body" v-if="data.responseBody">
      <div class="field-heading">response</div>
      <div v-for="(item, index) in data.responseBody" :key="index" style="margin-top:1rem">
        {{`${item.status} - ` + (getStatusCode(item.status)).description}}
        <DataVisualiser :data="item.data" />
      </div>
    </div>
  </div>
</template>

<script>
import DataVisualiser from "./DataVisualiser";
import getStatusCodes from "../../util/statusCodesList";
export default {
  props: ["data"],
  components: {
    DataVisualiser
  },
  methods: {
    getStatusCode(code) {
      return getStatusCodes.getOneStatusCode(code)
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.endpoint-data {
  padding: 1rem;
  pre {
    overflow: auto;
  }
  .field-heading {
    background: white;
    min-height: 2rem;
    display: flex;
    align-items: center;
    border: grey 1px solid;
    border-radius: 4px;
    padding: 0.5rem;
    box-sizing: border-box;
    text-transform: uppercase;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4);
  }
}
</style>