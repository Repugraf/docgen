import Vue from 'vue'
import Vuex from 'vuex'
import globals from './globals'
import endpoints from './modules/endpoints'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    axios: null,
    globals,
    modal: null
  },
  mutations: {
    setModal(state, payload) {
      state.modal = payload;
    },
    setAxios(state, payload) {
      state.axios = payload;
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
    endpoints,
    auth
  }
})
