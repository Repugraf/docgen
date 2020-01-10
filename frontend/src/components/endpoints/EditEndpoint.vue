<template>
  <div class="edit-endpoint-container">
    <div class="heading">
      <select v-model="tempMethod">
        <option v-for="i of methodOptions" :value="i" :key="i">{{i}}</option>
      </select>
      <input type="text" v-model="tempUrl" />
    </div>
    <div class="descrition">
      <h2>Description</h2>
      <textarea v-model="tempDescription" placeholder="Describe this endpoint"></textarea>
    </div>
    <!-- <div v-if="canHaveRequestBody" class="json-container">
      <h2>Request Body</h2>
      <jsoneditor v-if="tempRequestBody" v-model="tempRequestBody" />
      <button v-else @click="addBody('requestBody')">Add Body</button>
    </div>-->
    <EditableRequestBody v-if="canHaveRequestBody" v-model="tempRequestBody" />
    <div class="json-container">
      <h2>Response Body</h2>
      <jsoneditor v-if="tempResponseBody" v-model="tempResponseBody" />
      <button v-else @click="addBody('responseBody')">Add Body</button>
    </div>
    <div style="margin-top: 20px; display:flex;">
      <button :disabled="!somethingWasChanged" class="btn btn-submit" @click="saveEndpoint">Save</button>
      <button
        class="btn btn-cancel"
        style="margin-left: 10px;"
        @click="openConfirmDeleteModal"
      >Delete endpoint</button>
    </div>
    <!-- <pre>{{data}}</pre> -->
  </div>
</template>

<script>
import jsoneditor from "../jsoneditor";
import EditableRequestBody from "./EditableRequestBody";
import { methodOptions } from "../../util/consts";
export default {
  props: ["data"],
  components: {
    jsoneditor,
    EditableRequestBody
  },
  data() {
    return {
      tempMethod: "",
      tempUrl: "",
      tempDescription: "",
      tempRequestBody: null,
      tempResponseBody: null,
      methodOptions
    };
  },
  computed: {
    validFields() {
      const fieldsToUpdate = {...this.data};
      fieldsToUpdate.method = this.tempMethod;
      fieldsToUpdate.url = this.tempUrl;
      fieldsToUpdate.description = this.tempDescription;
      fieldsToUpdate.requestBody = this.tempRequestBody;
      fieldsToUpdate.responseBody = this.tempResponseBody;
      if (!this.tempRequestBody) delete fieldsToUpdate.requestBody;
      if (!this.tempRequestBody) delete fieldsToUpdate.responseBody;

      return fieldsToUpdate;
    },
    // validFieldsArePresent() {
    //   return Object.keys(this.validFields).length > 0;
    // },
    somethingWasChanged() {
      return (
        this.tempMethod !== this.data.method ||
        this.tempUrl !== this.data.url ||
        this.tempDescription !== this.data.description ||
        JSON.stringify(this.data.requestBody) !==
          JSON.stringify(this.tempRequestBody) ||
        JSON.stringify(this.data.responseBody) !==
          JSON.stringify(this.tempResponseBody)
      );
    },
    canHaveRequestBody() {
      switch (this.data.method) {
        case "POST":
          return true;
        case "PUT":
          return true;
        case "PATCH":
          return true;
        default:
          return false;
      }
    }
  },
  methods: {
    setInitialdata() {
      const { method, url, description } = this.data;
      this.tempMethod = method;
      this.tempUrl = url;
      this.tempDescription = description;
    },
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
      if (this.somethingWasChanged) {
        const payload = this.validFields;
        await this.$store.dispatch("endpoints/replaceEndpoint", payload);
        await this.$store.dispatch(
          "endpoints/getOneEndpoint",
          this.$route.params.id
        );
      }
    },
    async deleteEndpoint(id) {
      if (!id) return;
      await this.$store.dispatch("endpoints/deleteEndpoint", id);
      this.$router.push("/endpoints");
    },
    openConfirmDeleteModal() {
      if (confirm("Are you sure?")) this.deleteEndpoint(this.data._id);
    }
  },
  mounted() {
    this.setInitialdata();
    this.tempRequestBody = this.data.requestBody;
    this.tempResponseBody = this.data.responseBody;
  },
  destroyed() {
    this.$store.commit("endpoints/setCurrentEndpoint");
  }
};
</script>

<style lang="scss" scoped>
.edit-endpoint-container {
  * {
    box-sizing: border-box;
  }
  .heading {
    height: 2rem;
    display: flex;
    * {
      min-height: 100%;
      width: 100%;
    }
    input {
      flex: 10;
    }
    select {
      flex: 1;
    }
    @media (min-width: 661px) and (max-width: 920px) {
      select {
        flex: 1.5;
      }
    }
    @media (max-width: 660px) {
      select {
        flex: 3;
      }
    }
  }
  .descrition {
    textarea {
      width: 100%;
      min-height: 6rem;
      resize: none;
    }
  }
}
</style>