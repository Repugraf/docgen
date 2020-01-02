import axios from "axios";
export default {
  namespaced: true,
  state: {
    endpointsList: null,
    currentEndpoint: null
  },
  mutations: {
    setEndpoints(state, payload) {
      state.endpointsList = payload;
    },
    setCurrentEndpoint(state, payload) {
      state.currentEndpoint = payload;
    }
  },
  actions: {
    async getEndpoints({ rootState, commit }) {
      const endpoints = await axios.get(
        rootState.globals.GET_ALL_ENDPOINTS_URL
      );
      commit('setEndpoints', endpoints.data);
    },
    async addEndpoint({ rootState }, payload) {
      await axios.post(rootState.globals.ADD_ENDPOINT_URL, payload);
    },
    async deleteEndpoint({ rootState }, id) {
      await axios.delete(`${rootState.globals.DELETE_ENDPOINT_URL}/${id}`);
    },
    async getOneEndpoint({ rootState, commit }, id) {
      const endpoint = await axios.get(`${rootState.globals.GET_ENDPOINT_URL}/${id}`);

      commit('setCurrentEndpoint', endpoint.data);
    }
  }
}