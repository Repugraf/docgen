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
    async signup({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        if (!payload) throw new Error('no payload provided for signup!');
        await axios.post(`${rootState.globals.SIGNUP_URL}`, payload);
        commit('setIsLoading', false, { root: true });
      } finally {
        commit('setIsLoading', false, { root: true });
      }
    },
    async login({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        if (!payload) throw new Error('no payload provided for login!');
        const res = await axios.post(`${rootState.globals.LOGIN_URL}`, payload);
        const token = res.data.token;
        localStorage.setItem('token', token);
        commit('setToken', token);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        let errorMessage = '';
        if (error.response) errorMessage = error.response.data.message;
        else errorMessage = error.message;
        alert(errorMessage);
        commit('setIsLoading', false, { root: true });
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    token: state => state.token
  }
}