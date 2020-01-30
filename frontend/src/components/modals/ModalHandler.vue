<template>
  <component v-if="currentModal" :is="currentModal"/>
</template>

<script>
import Modal from "./Modal";
import CreateProjectModal from "./CreateProjectModal";
import CreateEndpointModal from "./CreateEndpointModal";

export default {
  components: {
    Modal,
    CreateProjectModal,
    CreateEndpointModal
  },
  computed: {
    currentModal() {
      return this.$store.state.modal;
    }
  }
}
</script>