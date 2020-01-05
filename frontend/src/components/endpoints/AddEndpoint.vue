<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label>
        <span>Method</span>
        <select v-model="method">
          <option value hidden>--Select option--</option>
          <option v-for="i of options" :key="i" :value="i">{{i}}</option>
        </select>
      </label>
      <label>
        <span>Url</span>
        <input type="text" v-model="url" />
      </label>
      <button :disabled="!isValid">Submit</button>
    </form>
  </div>
</template>

<script>
import closableModal from "../../util/mixins/closableModal";
import { isURL } from "validator";

export default {
  mixins: [closableModal],
  data() {
    return {
      method: "",
      url: "",
      options: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
      ]
    };
  },
  computed: {
    isValid() {
      return Boolean(this.method) && isURL(this.url, { require_host: false });
    }
  },
  methods: {
    async onSubmit() {
      if (!this.isValid) return;
      const payload = { method: this.method, url: this.url };
      await this.$store.dispatch("endpoints/addEndpoint", payload);
      await this.$store.dispatch("endpoints/getEndpoints");
      this.clearInputs();
      this.closeModal();
    },
    clearInputs() {
      this.url = "";
      this.method = "";
    }
  }
};
</script>
