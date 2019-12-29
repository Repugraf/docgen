<template>
  <div>
    <span>{{`${spaces}"${objKey}": `}}</span>
    <span v-if="isNotEmptyObject">{</span>
    <span v-if="val==='<dynamic>'">{{val}}</span>
    <DisplayValue v-else :value="val" :objKey="objKey" :type="value.type" :pathToRoot="pathToRoot"/>
  </div>
</template>

<script>
export default {
  props: ["objKey", "value", "pathToRoot"],
  computed: {
    val() {
      if (this.value.value === undefined) return "";
      if (this.value.type === "dynamic") return "<dynamic>"
      if (this.value.type === "object") {
        if (Object.keys(this.value.value).length === 0)
          /* return JSON.stringify( */this.value.value/* ) */;
        else return this.value.value;
      }
      return this.value.value;
    },
    spaces() {
      const amout = (this.pathToRoot.split('.').length)*2;
      return ".".repeat(amout);
    },
    isNotEmptyObject() {
      return (this.value.value && Object.keys(this.value.value).length > 0) && this.value.type === "object";
    }
  }
};
</script>