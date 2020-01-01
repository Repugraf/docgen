import axios from "axios";
export default {
  namespaced: true,
  state: {
    endpointsList: null
  },
  mutations: {
    setEndpoint(state, payload) {
      state.endpointsList = payload;
    }
  },
  actions: {
    async getEndpoints({rootState ,commit}) {
      const endpoints = await axios.get(
        rootState.globals.GET_ALL_ENDPOINTS_URL
      );
      commit('setEndpoint', endpoints.data);
    }
  }
}