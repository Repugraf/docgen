<template>
  <div class="page-container">
    <form @submit.prevent="submit" class="auth">
      <h2>Signup</h2>
      <div class="form-field">
        <label>
          <input type="text" v-model="name" placeholder="name" class="custom-input" />
        </label>
      </div>
      <div class="form-field">
        <label>
          <input type="text" v-model="email" placeholder="email" class="custom-input" />
        </label>
      </div>
      <div class="form-field">
        <label>
          <input type="password" v-model="password" placeholder="password" class="custom-input" />
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
  </div>
</template>

<script>
import { isEmail } from "validator";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    isValid() {
      return (
        isEmail(this.email) &&
        this.password.length >= 5 &&
        this.name.length > 0 &&
        this.password === this.confirmPassword
      );
    }
  },
  methods: {
    async submit() {
      if (!this.isValid) return;
      try {
        await this.$store.dispatch("auth/signup", this.getFields());
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
    },
    getFields() {
      return {
        name: this.name,
        email: this.email,
        password: this.password
      };
    }
  }
};
</script>