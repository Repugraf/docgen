<template>
  <form @submit.prevent="submit" class="auth">
    <h2>New Password</h2>
    <div class="form-field">
      <label>
        <input
          type="password"
          v-model="password"
          placeholder="password"
          class="custom-input"
          autocomplete="new-password"
        />
      </label>
    </div>
    <div class="form-field">
      <label>
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="confirm password"
          class="custom-input"
        />
      </label>
    </div>
    <button class="btn btn-submit" :disabled="!isValid">submit</button>
  </form>
</template>

<script>
export default {
  data: () => ({
    email: "",
    code: "",
    password: "",
    confirmPassword: ""
  }),
  computed: {
    isValid() {
      return (
        this.password.length >= 5 &&
        this.password === this.confirmPassword &&
        this.code &&
        this.email
      );
    }
  },
  methods: {
    async submit() {
      if (!this.isValid) return;
      try {
        const payload = {
          email: this.email,
          code: this.code,
          password: this.password
        };
        await this.$store.dispatch("auth/changePassword", payload);
        this.$notify({
          group: "success",
          title: "Password changed!",
          text:
            "Password was successfully changed. Please login with your new password",
          type: "success",
          duration: 10000
        });
        this.$router.push("/login");
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
  },
  beforeMount() {
    this.email = this.$route.query.email || "";
    this.code = this.$route.query.code || "";
  }
};
</script>