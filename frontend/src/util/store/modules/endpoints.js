// import axios from "axios";
import { getAuthAxios } from "../../auth";
let axios;
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
    setCurrentEndpoint(state, payload = null) {
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
      if(!axios) axios = getAuthAxios(rootState.getters[`auth/token`]);
      await axios.post(rootState.globals.ADD_ENDPOINT_URL, payload);
    },
    async deleteEndpoint({ rootState }, id) {
      if(!axios) axios = getAuthAxios(rootState.getters[`auth/token`]);
      await axios.delete(`${rootState.globals.DELETE_ENDPOINT_URL}/${id}`);
    },
    async getOneEndpoint({ rootState, commit }, id) {
      if(!axios) axios = getAuthAxios(rootState.getters[`auth/token`]);
      const endpoint = await axios.get(`${rootState.globals.GET_ENDPOINT_URL}/${id}`);
      commit('setCurrentEndpoint', endpoint.data);
    },
    async updateEndpoint({ rootState }, payload) {
      if(!axios) axios = getAuthAxios(rootState.getters[`auth/token`]);
      await axios.patch(rootState.globals.UPDATE_ENDPOINT_URL, payload);
    },
    async replaceEndpoint({ rootState }, payload) {
      if(!axios) axios = getAuthAxios(rootState.getters[`auth/token`]);
      await axios.put(rootState.globals.REPLACE_ENDPOINT_URL, payload);
    }
  }
}