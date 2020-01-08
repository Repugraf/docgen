<template>
  <div>
    <div class="json-editor-container" ref="jsoneditor"></div>
    <button class="btn btn-cancel" style="border-radius: 0;" @click="setJSON(null)">Delete Field</button>
  </div>
</template>

<script>
import jsoneditor from "jsoneditor";

export default {
  data() {
    return {
      editor: null
    };
  },
  methods: {
    setJSON(json) {
      this.$emit("input", json);
    }
  },
  mounted() {
    this.editor = new jsoneditor(this.$refs.jsoneditor, {
      mode: "tree",
      onChangeJSON: this.setJSON
    });
    this.editor.set(this.$attrs.value);
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>