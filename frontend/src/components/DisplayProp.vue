<template>
  <div>
    {{`"${objKey}": `}}
    <DisplayValue :value="val" />
  </div>
</template>

<script>
export default {
  props: ["objKey", "value"],
  computed: {
    val() {
      if (!this.value) return "";
      if (typeof this.value === "object") {
        if (Object.keys(this.value).length === 0)
          return JSON.stringify(this.value);
        else return this.value;
      }
      return this.value;
    }
  }
};
</script>