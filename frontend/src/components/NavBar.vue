<template>
  <nav class="nav-bar">
    <div class="links-container">
      <router-link to="/endpoints" class="router-link">
        <div>home</div>
      </router-link>
      <router-link to="/about" class="router-link">
        <div>about</div>
      </router-link>
      <router-link to="/login" class="router-link" v-if="!isAuth">
        <div>login</div>
      </router-link>
      <a class="router-link" v-if="isAuth" @click="logout">
        <div>logout</div>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('auth/setToken', null);
      this.$router.push('/login');
    }
  }
}
</script>