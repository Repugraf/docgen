<template>
  <component v-if="currentModal" :is="currentModal"/>
</template>

<script>
import Modal from "./Modal";
import CreateEndpointModal from "./CreateEndpointModal";

export default {
  components: {
    Modal,
    CreateEndpointModal
  },
  computed: {
    currentModal() {
      return this.$store.state.modal;
    }
  }
}
</script>