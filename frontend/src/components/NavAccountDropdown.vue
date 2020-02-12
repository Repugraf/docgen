<template>
  <a
    class="nav-dropdown"
    v-if="isAuth"
    style="margin-left: auto;"
    tabindex="1"
    @blur="display=false"
  >
    <div class="dropdown-button" @click="display=!display">
      {{user && user.name ||'account'}}
      <div class="arrow-down"></div>
    </div>
    <div class="dropdown-menu" v-if="display">
      <a class="router-link" @click="$store.dispatch('auth/logout')">logout</a>
    </div>
  </a>
</template>

<script>
export default {
  props: ["isAuth"],
  data: () => ({ display: false }),
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  }
};
</script>