<template>
  <div>
    <textarea v-model="data"></textarea>
    <button class="btn btn-cancel" style="border-radius: 0;" @click="setData(null)">Delete Field</button>
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