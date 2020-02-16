import axios from "axios";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  mutations: {
    setToken: (state, payload) => state.token = payload,
    setUser: (state, payload) => state.user = payload
  },
  actions: {
    async signup({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        if (!payload) throw new Error('no payload provided for signup!');
        await axios.post(`${rootState.globals.SIGNUP_URL}`, payload);
      } finally {
        commit('setIsLoading', false, { root: true });
      }
    },
    async login({ rootState, commit, dispatch }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        if (!payload) throw new Error('no payload provided for login!');
        const res = await axios.post(`${rootState.globals.LOGIN_URL}`, payload);
        const token = res.data.token;
        localStorage.setItem('token', token);
        commit('setToken', token);
        await dispatch('getUser');
      } finally {
        commit('setIsLoading', false, { root: true });
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('setToken', null);
      commit('setUser', null);
      router.push('/login');
    },
    async getUser({ rootState, commit }) {
      try {
        commit('setIsLoading', true, { root: true });
        const user = await axios.get(`${rootState.globals.GET_USER_URL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        commit('setUser', user.data);
      } finally {
        commit('setIsLoading', false, { root: true });
      }
    },
    async sendConfirmationMail({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        await axios.post(`${rootState.globals.CONFIRM_MAIL_URL}`, payload);
      } finally {
        commit('setIsLoading', false, { root: true });
      }
    },
    async changePassword({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        await axios.post(`${rootState.globals.CHANGE_PASSWORD_URL}`, payload);
      } finally {
        commit('setIsLoading', false, { root: true });
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    token: state => state.token,
    user: state => state.user
  }
}