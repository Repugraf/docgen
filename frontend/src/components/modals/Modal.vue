<template>
  <div class="modal-bg" @click.self="closeModal">
    <div class="modal-container" ref="modal" tabindex="1" @keyup.esc="closeModal">
      <slot />
    </div>
  </div>
</template>

<script>
import closableModal from "../../util/mixins/closableModal";
export default {
  mixins: [closableModal],
  mounted() {
    this.$refs.modal.focus();
  }
};
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  .modal-container {
    &:focus {
      outline: none;
    }
    padding: 2%;
    background-color: white;
    border-radius: 1rem;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    min-height: 30vh;
    position: fixed;
  }
}
</style>