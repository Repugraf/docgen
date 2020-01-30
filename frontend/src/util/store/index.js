import Vue from 'vue'
import Vuex from 'vuex'
import globals from './globals'
import projects from './modules/projects'
import endpoints from './modules/endpoints'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    axios: null,
    globals,
    modal: null,
    isLoading: false
  },
  mutations: {
    setModal(state, payload) {
      state.modal = payload;
    },
    setAxios(state, payload) {
      state.axios = payload;
    },
    setIsLoading(state, payload = false) {
      state.isLoading = payload;
    } 
  },
  actions: {
  },
  getters: {
    isLoading: state => !!state.isLoading
  },
  modules: {
    projects,
    endpoints,
    auth
  }
})
