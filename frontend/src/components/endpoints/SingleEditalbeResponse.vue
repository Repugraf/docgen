<template>
  <div>
    <div class="editable-field-heading-container">
    <h2>{{item.status}}</h2>
      <select v-if="item.data !== undefined && item.data !== null && component" v-model="component">
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
import jsoneditor from "../jsoneditor";
import texteditor from "../texteditor";
export default {
  props: ["item", "index", "items"],
  components: {
    jsoneditor,
    texteditor
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
</style>