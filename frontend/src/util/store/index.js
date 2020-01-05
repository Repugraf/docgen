import Vue from 'vue'
import Vuex from 'vuex'
import globals from './globals'
import endpoints from './modules/endpoints'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globals,
    modal: null
  },
  mutations: {
    setModal(state, payload) {
      state.modal = payload;
    }
  },
  actions: {
  },
  modules: {
    endpoints
  }
})
