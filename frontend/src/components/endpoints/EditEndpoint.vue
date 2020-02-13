<template>
  <div class="edit-endpoint-container page-container">
    <div class="heading">
      <select v-model="tempMethod" class="custom-select">
        <option v-for="i of methodOptions" :value="i" :key="i">{{i}}</option>
      </select>
      <input
        type="text"
        v-model="tempUrl"
        class="custom-input"
        :class="{invalid:!urlValid}"
        style="border-left:none;"
      />
    </div>
    <div class="descrition">
      <h2>Description</h2>
      <textarea v-model="tempDescription" placeholder="Describe this endpoint" class="custom-input"></textarea>
    </div>
    <EditableRequestBody v-if="canHaveRequestBody" v-model="tempRequestBody" />
    <EditableResponseBody v-model="tempResponseBody" />
    <div style="margin-top: 20px; display:flex;">
      <button
        :disabled="!somethingWasChanged || !isValid"
        class="btn btn-submit"
        @click="saveEndpoint"
      >Save</button>
      <button
        class="btn btn-cancel"
        style="margin-left: 10px;"
        @click="openConfirmDeleteModal"
      >Delete endpoint</button>
    </div>
  </div>
</template>

<script>
import EditableRequestBody from "./EditableRequestBody";
import EditableResponseBody from "./EditableResponseBody";
import { isURL } from "validator";
import { methodOptions } from "../../util/consts";
export default {
  props: ["data"],
  components: {
    EditableRequestBody,
    EditableResponseBody
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
    urlValid() {
      return isURL(this.tempUrl, { require_host: false });
    },
    isValid() {
      return this.urlValid && !!this.tempMethod;
    },
    validFields() {
      const fieldsToUpdate = { ...this.data };

      const RequestBody =
        typeof this.tempRequestBody === "object"
          ? JSON.parse(JSON.stringify(this.tempRequestBody))
          : this.tempRequestBody;
      const ResponseBody =
        typeof this.tempResponseBody === "object"
          ? JSON.parse(JSON.stringify(this.tempResponseBody))
          : this.tempResponseBody;

      fieldsToUpdate.method = this.tempMethod;
      fieldsToUpdate.url = this.tempUrl;
      fieldsToUpdate.description = this.tempDescription;
      fieldsToUpdate.requestBody = RequestBody;
      fieldsToUpdate.responseBody = ResponseBody;
      if (!RequestBody) delete fieldsToUpdate.requestBody;
      if (!ResponseBody) delete fieldsToUpdate.responseBody;
      return fieldsToUpdate;
    },
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
      if (this.somethingWasChanged && this.isValid) {
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
      if (this.data.project_id)
        return this.$router.push(`/project/${this.data.project_id}`);
      this.$router.push("/endpoints");
    },
    openConfirmDeleteModal() {
      if (confirm("Are you sure?")) this.deleteEndpoint(this.data._id);
    }
  },
  mounted() {
    this.setInitialdata();
    this.tempRequestBody =
      typeof this.data.requestBody === "object" &&
      this.data.requestBody !== null
        ? JSON.parse(JSON.stringify(this.data.requestBody))
        : this.data.requestBody;
    this.tempResponseBody =
      typeof this.data.responseBody === "object" &&
      this.data.responseBody !== null
        ? JSON.parse(JSON.stringify(this.data.responseBody))
        : this.data.responseBody;
  },
  destroyed() {
    this.$store.commit("endpoints/setCurrentEndpoint");
  }
};
</script>