<template>
  <div :ref="id"></div>
</template>

<script>
import jsoneditor from "jsoneditor";
import uuid from "uuid/v4";

export default {
  props: ["json"],
  data() {
    return {
      id: `jsoneditor-${uuid()}`,
      editor: null
    };
  },
  methods: {
    setJSON(json) {
      this.$emit("input", json);
    }
  },
  mounted() {
    const options = {
      mode: "tree",
      onChangeJSON: this.setJSON
    };
    const container = this.$refs[this.id];
    this.editor = new jsoneditor(container, options);
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