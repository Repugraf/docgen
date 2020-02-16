<template>
  <form class="modal-form" @submit.prevent="submit">
    <v-select
      v-model="method"
      :options="options"
      placeholder="--Select method--"
      :clearable="false"
      :searchable="false"
      transition="none"
    />
    <label>
      <input
        type="text"
        placeholder="Url"
        v-model="url"
        class="custom-input"
        :class="{invalid: !urlValid}"
      />
    </label>
    <label>
      <textarea v-model="description" placeholder="Description" class="custom-input"></textarea>
    </label>
    <p style="color:red; font-size:0.6rem;" v-if="!urlValid">invalid url</p>
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
    urlValid() {
      return this.url.length === 0 || isURL(this.url, { require_host: false });
    },
    isValid() {
      return Boolean(this.method) && isURL(this.url, { require_host: false });
    }
  },
  methods: {
    async submit() {
      if (!this.isValid) return;
      const payload = {
        method: this.method,
        url: this.url,
        description: this.description
      };
      if (this.$route.params.id) payload.project_id = this.$route.params.id;
      await this.$store.dispatch("endpoints/addEndpoint", payload);
      if (this.$route.params.id)
        await this.$store.dispatch("endpoints/getEndpointsByFilter", {
          project_id: this.$route.params.id
        });
      else await this.$store.dispatch("endpoints/getEndpoints");
      this.clearInputs();
      this.closeModal();
    },
    clearInputs() {
      this.url = "";
      this.method = "";
      this.description = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-input {
  font-size: 1rem;
  color: #333;
}
textarea.custom-input {
  font-size: 1.1rem;
}
</style>