<template>
  <form @submit.prevent="submit" class="modal-form">
    <label>
      <input type="text" placeholder="Name" v-model="name" class="custom-input" />
    </label>
    <label>
      <input
        type="text"
        placeholder="Base URL"
        v-model="baseUrl"
        class="custom-input"
        :class="{invalid:!urlValid}"
      />
    </label>
    <label>
      <textarea
        v-model="description"
        placeholder="Description"
        class="custom-input"
        style="height: 7rem;"
      ></textarea>
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
export default {
  mixins: [closableModal],
  data() {
    return {
      name: "",
      baseUrl: "",
      description: ""
    };
  },
  computed: {
    urlValid() {
      return (
        this.baseUrl.length === 0 ||
        isURL(this.baseUrl, { require_host: false })
      );
    },
    isValid() {
      return this.name.length > 0 && this.urlValid;
    }
  },
  methods: {
    async submit() {
      if (!this.isValid) return;
      const payload = {
        name: this.name,
        description: this.description,
        base_url: this.baseUrl
      };
      await this.$store.dispatch("projects/createProject", payload);
      await this.$store.dispatch("projects/getProjects");
      this.closeModal();
    }
  }
};
</script>