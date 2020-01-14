<template>
  <div>
    <div class="editable-field-heading-container">
      <h2>Request Body</h2>
      <select v-if="data !== null && data !== undefined && component" v-model="component" class="type">
        <option value="jsoneditor">application/json</option>
        <option value="texteditor">text/plain</option>
      </select>
    </div>
    <component
      v-if="data !== null && data !== undefined && component"
      :is="component"
      v-model="data"
      @deleteField="data = undefined"
    />
    <button v-else @click="setBody({})" class="btn btn-submit">Add Body</button>
  </div>
</template>

<script>
import jsoneditor from "../jsoneditor";
import texteditor from "../texteditor";
export default {
  components: {
    jsoneditor,
    texteditor
  },
  computed: {
    data: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    component: {
      get() {
        switch (typeof this.data) {
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
    setBody(val = {}) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss">

</style>