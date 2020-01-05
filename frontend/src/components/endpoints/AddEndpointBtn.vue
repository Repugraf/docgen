<template>
  <button @click="openModal">Add endpoint</button>
</template>

<script>
export default {
  methods: {
    openModal() {
      this.$store.commit("setModal", "CreateEndpointModal");
    }
  }
};
</script>