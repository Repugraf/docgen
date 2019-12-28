<template>
  <div>
    <pre>{{obj}}</pre>
    <form @submit.prevent="addProp">
      <input type="text" name v-model="propName" />
      <button type="submit">add prop</button>
      <button type="button" @click="currentObj=null">clear</button>
    </form>
    <div v-if="obj">
    <p v-for="i of Object.keys(currentObj)" :key="i">{{i}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentObj: null,
      propName: ""
    };
  },
  computed: {
    obj() {
      if (!this.currentObj) return this.currentObj;
      return JSON.stringify(this.currentObj, null, 2);
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