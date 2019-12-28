<template>
  <span v-if="!isObject">{{value}}</span>
  <div v-else>
    {
    <DisplayProp v-for="i of Object.entries(value)" :key="i[0]" :objKey="i[0]" :value="i[1]" />}
  </div>
</template>

<script>
export default {
  props: ["value"],
  computed: {
    isObject() {
      return typeof this.value === "object";
    }
  }
};
</script>