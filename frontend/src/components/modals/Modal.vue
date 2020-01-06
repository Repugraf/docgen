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