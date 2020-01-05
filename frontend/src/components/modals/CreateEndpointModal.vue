<template>
  <Modal>
    <AddEndpoint/>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import AddEndpoint from "../endpoints/AddEndpoint";
export default {
  components: {
    Modal,
    AddEndpoint
  }
};
</script>