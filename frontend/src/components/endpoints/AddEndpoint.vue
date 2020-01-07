<template>
    <form class="add-endpoint" @submit.prevent="onSubmit">
      <label>
        <select v-model="method" ref="select">
          <option value hidden>--Select method--</option>
          <option v-for="i of options" :key="i" :value="i">{{i}}</option>
        </select>
      </label>
      <label>
        <input type="text" placeholder="Url" v-model="url" />
      </label>
      <label>
        <textarea v-model="description" placeholder="Description"></textarea>
      </label>
      <div class="controlls-container">
        <button class="btn btn-cancel" type="button" @click="closeModal" tabindex="-1">cancel</button>
        <button class="btn btn-submit" :disabled="!isValid">submit</button>
      </div>
    </form>
</template>

<script>
import closableModal from "../../util/mixins/closableModal";
import { isURL } from "validator";
import { methodOptions as options } from "../../util/consts";

export default {
  mixins: [closableModal],
  data() {
    return {
      method: "",
      url: "",
      description: "",
      options
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
      const payload = {
        method: this.method,
        url: this.url,
        description: this.description
      };
      if (!this.description) delete payload.description;
      await this.$store.dispatch("endpoints/addEndpoint", payload);
      await this.$store.dispatch("endpoints/getEndpoints");
      this.clearInputs();
      this.closeModal();
    },
    clearInputs() {
      this.url = "";
      this.method = "";
      this.description = "";
    }
  },
  mounted() {
    setTimeout(() => this.$refs.select.focus());
  }
};
</script>