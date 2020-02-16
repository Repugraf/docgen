<template>
  <form @submit.prevent="submit" class="auth">
    <h2>Your Email</h2>
    <div class="form-field">
      <label>
        <input type="text" v-model="email" placeholder="email" class="custom-input" />
      </label>
    </div>
    <button class="btn btn-submit" :disabled="!isValid">submit</button>
  </form>
</template>

<script>
import { isEmail } from "validator";
export default {
  data: () => ({ email: "" }),
  computed: {
    isValid() {
      return isEmail(this.email);
    }
  },
  methods: {
    async submit() {
      if (!this.isValid) return;
      try {
        await this.$store.dispatch("auth/sendConfirmationMail", {
          email: this.email
        });
        this.$notify({
          group: "success",
          title: "Link was sent you your email",
          text:
            "Confirmation link was sent to your email. Please check you innbox. If you can't find it please check your spam foulder!",
          duration: -1,
          type: "success"
        });
        this.email = "";
      } catch (error) {
        let errorMessage = error.message;
        if (error.response) errorMessage = error.response.data.message;
        this.$notify({
          group: "error",
          title: "Something went wrong",
          text: errorMessage,
          type: "error"
        });
      }
    }
  }
};
</script>