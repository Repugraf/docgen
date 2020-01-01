<template>
  <div ref="jsoneditor"></div>
</template>

<script>
import jsoneditor from "jsoneditor";

export default {
  props: ["json"],
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
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">
@import "../../node_modules/jsoneditor/dist/jsoneditor.css";
$editor-color: black;
$editor-border-color: black;
// $editor-border-color: transparent;
.jsoneditor {
  border-color: $editor-border-color;
  > .jsoneditor-menu {
    background-color: $editor-color;
    border-bottom-color: $editor-border-color;
  }
}
.pico-modal-header {
  background-color: $editor-color !important;
}
.jsoneditor-button-group-value-asc {
  input.jsoneditor-button-asc {
    background: $editor-color !important;
    border-color: $editor-border-color !important;
  }
}
.jsoneditor-button-group-value-desc {
  input.jsoneditor-button-desc {
    background: $editor-color !important;
    border-color: $editor-border-color !important;
  }
}
</style>