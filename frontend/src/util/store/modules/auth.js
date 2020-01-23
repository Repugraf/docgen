import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {
    async signup({ rootState }, payload) {
      if(!payload) throw new Error('no payload provided for signup!');
      await axios.post(`${rootState.globals.SIGNUP_URL}`, payload);
    },
    async login({rootState, commit}, payload) {
      if(!payload) throw new Error('no payload provided for login!');
      const res = await axios.post(`${rootState.globals.LOGIN_URL}`, payload);
      const token = res.data.token;
      localStorage.setItem('token', token);
      commit('setToken', token);
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    token: state => state.token
  }
}