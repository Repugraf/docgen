<template>
  <div>
    <div v-if="currentObj">
      {
      <DisplayProp
        v-for="i of Object.entries(currentObj)"
        :key="i[0]"
        :objKey="i[0]"
        :value="i[1]"
        :pathToRoot="i[0]"
      />}
    </div>
  </div>
</template>

<script>
import DisplayProp from "./DisplayProp";
export default {
  components: {
    DisplayProp
  },
  computed: {
    currentObj() {
      return this.$store.state.currentObject.value;
    }
  }
};
</script>