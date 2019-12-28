<template>
  <div>
    <form @submit.prevent="addProp">
      <input type="text" name="name" v-model="propName" />
      <button type="submit">add prop</button>
      <button type="button" @click="currentObj=null">clear</button>
    </form>
    <DisplayObject />
  </div>
</template>

<script>
import DisplayObject from "./DisplayObject";
export default {
  components: {
    DisplayObject
  },
  data() {
    return {
      propName: ""
    };
  },
  computed: {
    currentObj: {
      get() {
        return this.$store.state.currentObject;
      },
      set(value) {
        this.$store.state.currentObject = value;
      }
    }
  },
  methods: {
    addProp() {
      if (!this.currentObj) this.currentObj = {};
      this.currentObj[this.propName] = {};
      this.currentObj = JSON.parse(JSON.stringify(this.currentObj));
    }
  }
};
</script>