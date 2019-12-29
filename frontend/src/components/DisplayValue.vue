<template>
  <span v-if="!isObject">{{wrappedValue}}</span>
  <span v-else-if="isEmptyObject">{}</span>
  <div v-else>
    <!-- <span>{{ `${spaces}{` }}</span> -->
    <DisplayProp
      v-for="i of Object.entries(value)"
      :key="i[0]"
      :objKey="i[0]"
      :pathToRoot="`${pathToRoot}.${i[0]}`"
      :value="i[1]"
    />
    <span>{{ spaces+'}' }}</span>
  </div>
</template>

<script>
export default {
  props: ["value", "objKey", "pathToRoot", "type"],
  computed: {
    isObject() {
      return typeof this.value === "object" && this.value !== null;
    },
    isEmptyObject() {
      if (this.isObject) return Object.keys(this.value).length === 0;
      return false;
    },
    wrappedValue() {
      if (!this.isObject) {
        if (this.value === null) return "null";
        switch (typeof this.value) {
          case "string":
            return `"${this.value}"`;
          default:
            return this.value;
        }
      }
      return "null";
    },
    spaces() {
      const amout = this.pathToRoot.split(".").length * 2;
      return ".".repeat(amout);
    }
  }
};
</script>