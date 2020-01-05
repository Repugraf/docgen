export default {
  methods: {
    closeModal() {
      this.$store.commit('setModal', null);
    }
  }
}