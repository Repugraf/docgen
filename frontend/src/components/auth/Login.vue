<template>
  <div class="page-container">
    <form @submit.prevent="submit" class="auth">
      <h2>Login</h2>
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
      <button class="btn btn-submit" :disabled="!isValid">submit</button>
      <h4>
        Not Registered?
        <router-link to="/signup">Signup&nbsp;</router-link>instead!
        <br />
        <br />
        <router-link to="/change-password/email">Forgot password?</router-link>
      </h4>
    </form>
  </div>
</template>

<script>
import { isEmail } from "validator";
import { getAuthAxios } from "../../util/auth";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    isValid() {
      return isEmail(this.email) && this.password.length >= 5;
    }
  },
  methods: {
    async submit() {
      if (!this.isValid) return;
      try {
        await this.$store.dispatch("auth/login", this.getFields());
        this.$store.commit(
          "setAxios",
          getAuthAxios(this.$store.getters[`auth/token`])
        );
        this.$router.push("/");
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
      return { email: this.email, password: this.password };
    }
  }
};
</script>