<template>
  <div>
    <textarea v-model="data"></textarea>
    <button class="btn btn-cancel" style="border-radius: 0;" @click="setData(undefined)">Delete Field</button>
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
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  textarea {
    box-sizing: border-box;
    margin: 0;
    resize: none;
    width: 100%;
    min-height: 7rem;
  }
}
</style>