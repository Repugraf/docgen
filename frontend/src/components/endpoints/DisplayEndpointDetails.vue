<template>
  <div class="endpoint-display-menu">
    <div class="json-container">
      <h2>Request Body</h2>
      <jsoneditor v-if="tempRequestBody" v-model="tempRequestBody" />
      <button v-else @click="addBody('requestBody')">Add Body</button>
    </div>
    <div class="json-container">
      <h2>Response Body</h2>
      <jsoneditor v-if="tempResponseBody" v-model="tempResponseBody" />
      <button v-else @click="addBody('responseBody')">Add Body</button>
    </div>
    <div v-if="validFieldsArePresent && somethingWasChanged" style="margin-top: 20px;">
      <button @click="saveEndpoint">Save</button>
    </div>
    <pre>{{data}}</pre>
  </div>
</template>

<script>
import jsoneditor from "../jsoneditor";
export default {
  props: ["data"],
  components: {
    jsoneditor
  },
  data() {
    return {
      tempRequestBody: null,
      tempResponseBody: null
    };
  },
  computed: {
    validFields() {
      const fieldsToUpdate = {};
      if (this.tempRequestBody)
        fieldsToUpdate.requestBody = this.tempRequestBody;
      if (this.tempResponseBody)
        fieldsToUpdate.responseBody = this.tempResponseBody;
      return fieldsToUpdate;
    },
    validFieldsArePresent() {
      return Object.keys(this.validFields).length > 0;
    },
    somethingWasChanged() {
      return (
        JSON.stringify(this.data.requestBody) !==
          JSON.stringify(this.tempRequestBody) ||
        JSON.stringify(this.data.responseBody) !==
          JSON.stringify(this.tempResponseBody)
      );
    }
  },
  methods: {
    addBody(type) {
      switch (type) {
        case "requestBody":
          this.tempRequestBody = {};
          break;
        case "responseBody":
          this.tempResponseBody = {};
          break;
        default:
          break;
      }
    },
    async saveEndpoint() {
      if (this.validFieldsArePresent && this.somethingWasChanged) {
        let payload = JSON.parse(JSON.stringify(this.data));
        const validFields = this.validFields;
        payload = { ...payload, ...validFields };
        payload = JSON.parse(JSON.stringify(payload));
        await this.$store.dispatch("endpoints/updateEndpoint", payload);
        await this.$store.dispatch(
          "endpoints/getOneEndpoint",
          this.$route.params.id
        );
      }
    }
  },
  mounted() {
    this.tempRequestBody = this.data.requestBody;
    this.tempResponseBody = this.data.responseBody;
  }
};
</script>

<style lang="scss" scoped>
.endpoint-display-menu {
  .json-container {
  }
}
</style>