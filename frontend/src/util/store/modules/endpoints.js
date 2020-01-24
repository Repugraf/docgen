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
      const endpoints = await rootState.axios.get(
        rootState.globals.GET_ALL_ENDPOINTS_URL
      );
      commit('setEndpoints', endpoints.data);
    },
    async addEndpoint({ rootState }, payload) {
      await rootState.axios.post(rootState.globals.ADD_ENDPOINT_URL, payload);
    },
    async deleteEndpoint({ rootState }, id) {
      await rootState.axios.delete(`${rootState.globals.DELETE_ENDPOINT_URL}/${id}`);
    },
    async getOneEndpoint({ rootState, commit }, id) {
      const endpoint = await rootState.axios.get(`${rootState.globals.GET_ENDPOINT_URL}/${id}`);
      commit('setCurrentEndpoint', endpoint.data);
    },
    async updateEndpoint({ rootState }, payload) {
      await rootState.axios.patch(rootState.globals.UPDATE_ENDPOINT_URL, payload);
    },
    async replaceEndpoint({ rootState }, payload) {
      await rootState.axios.put(rootState.globals.REPLACE_ENDPOINT_URL, payload);
    }
  }
}