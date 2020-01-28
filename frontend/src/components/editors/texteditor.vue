<template>
  <div>
    <textarea v-model="data" class="custom-input"></textarea>
    <button class="btn btn-cancel" @click="deleteField">Delete Field</button>
  </div>
</template>

<script>
export default {
  computed: {
    data: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.setData(value);
      }
    }
  },
  methods: {
    setData(val) {
      this.$emit("input", val);
    },
    deleteField() {
      this.$emit("deleteField");
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  border: 1px solid black;
  textarea {
    box-sizing: border-box;
    margin: 0;
    resize: none;
    width: 100%;
    min-height: 7rem;
    border: none;
  }
  button {
    border-radius: 0;
    margin-top: -4px;
    border-top: 1px solid black;
  }
}
</style>