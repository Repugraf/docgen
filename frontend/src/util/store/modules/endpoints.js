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
      try {
        commit('setIsLoading', true, { root: true });
        const endpoints = await rootState.axios.get(
          rootState.globals.GET_ALL_ENDPOINTS_URL
        );
        commit('setEndpoints', endpoints.data);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async getEndpointsByFilter({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        const endpoint = await rootState.axios.post(`${rootState.globals.GET_ENDPOINT_URL}`, payload);
        commit('setEndpoints', endpoint.data);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async addEndpoint({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        await rootState.axios.post(rootState.globals.ADD_ENDPOINT_URL, payload);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async deleteEndpoint({ rootState, commit }, id) {
      try {
        commit('setIsLoading', true, { root: true });
        await rootState.axios.delete(`${rootState.globals.DELETE_ENDPOINT_URL}/${id}`);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async getOneEndpoint({ rootState, commit }, id) {
      try {
        commit('setIsLoading', true, { root: true });
        const endpoint = await rootState.axios.get(`${rootState.globals.GET_ENDPOINT_URL}/${id}`);
        commit('setCurrentEndpoint', endpoint.data);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async updateEndpoint({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        await rootState.axios.patch(rootState.globals.UPDATE_ENDPOINT_URL, payload);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async replaceEndpoint({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        await rootState.axios.put(rootState.globals.REPLACE_ENDPOINT_URL, payload);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    }
  }
}