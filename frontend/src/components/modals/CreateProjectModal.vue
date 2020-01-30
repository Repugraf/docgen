<template>
  <Modal>
    <CreateProject/>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import CreateProject from "../projects/CreateProject";
export default {
  components: {
    Modal,
    CreateProject
  }
};
</script>