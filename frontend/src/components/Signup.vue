<template>
  <div class="login-container">
    <form @submit.prevent="submit">
      <h2>Signup</h2>
      <div class="form-field">
        <label>
        <input type="text" v-model="name"  placeholder="name"/>
        </label>
      </div>
      <div class="form-field">
        <label>
        <input type="text" v-model="email"  placeholder="email"/>
        </label>
      </div>
      <div class="form-field">
        <label>
        <input type="password" v-model="password"  placeholder="password"/>
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
    };
  },
  computed: {
    isValid() {
      return isEmail(this.email) && this.password.length >= 5 && this.name.length > 0;
    }
  },
  methods: {
    submit() {
      if(!this.isValid) return;
      console.log(this.email, this.password, this.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  max-width: 1200px;
  margin: 0 auto;
  form {
    margin: 5rem auto;
    width: 50%;
    * {
      box-sizing: border-box;
    }
    .form-field {
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
    }
  }
}
</style>