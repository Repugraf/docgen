<template>
  <div class="editable-field-container">
    <div class="editable-field-heading-container response-field-heading">
      <select v-model="item.status" class="custom-select">
        <option v-for="i of codeOptions" :value="i.status" :key="i.status">{{`${i.status} - ${i.description}`}}</option>
      </select>
      <select v-if="item.data !== undefined && item.data !== null && component" v-model="component" class="type custom-select">
        <option value="jsoneditor">application/json</option>
        <option value="texteditor">text/plain</option>
      </select>
    </div>
    <component
      v-if="item.data !== undefined && item.data !== null && component"
      :is="component"
      v-model="item.data"
      @deleteField="deleteField"
    />
  </div>
</template>

<script>
import jsoneditor from "../editors/jsoneditor";
import texteditor from "../editors/texteditor";
import statusCodesList from "../../util/statusCodesList";

export default {
  props: ["item", "index", "items"],
  components: {
    jsoneditor,
    texteditor
  },
  data() {
    return {
      codeOptions: statusCodesList.statusCodes
    }
  },
  computed: {
    component: {
      get() {
        switch (typeof this.item.data) {
          case "object":
            return "jsoneditor";
          case "string":
            return "texteditor";
          default:
            return false;
        }
      },
      set(value) {
        switch (value) {
          case "jsoneditor":
            this.setBody({});
            break;
          case "texteditor":
            this.setBody("");
            break;
          default:
            this.setBody(null);
            break;
        }
      }
    }
  },
  methods: {
    setBody(value = {}) {
      this.item.data = value;
    },
    deleteField() {
      this.$emit('deleteField', this.index);
    }
  }
};
</script>

<style>
.response-field-heading{
  margin-bottom: 1rem;
}
</style>