<template>
  <div>
    <span>{{typeofData}}</span>
    <pre>{{data}}</pre>
  </div>
</template>

<script>
export default {
  props: ["data"],
  computed: {
    typeofData() {
      if (typeof this.data === 'object') return 'application/json';
      return 'text/plain';
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  position: relative;
  margin: 0 2.5rem;
  span {
    position: absolute;
    background-color: white;
    right: 0;
    padding: 0 2px;
    border-radius: 2px;
    border: 1px solid black;
  }
  pre {
    background: black;
    color: white;
    padding: 2rem 1rem;
    border-radius: 5px;
  }
}
</style>