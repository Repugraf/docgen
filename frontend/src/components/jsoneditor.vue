<template>
  <div class="json-editor-container" ref="jsoneditor"></div>
</template>

<script>
import jsoneditor from "jsoneditor";

export default {
  data() {
    return {
      editor: null
    };
  },
  computed: {
    json() {
      return this.$attrs.value;
    }
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
    this.editor.set(this.json); 
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>