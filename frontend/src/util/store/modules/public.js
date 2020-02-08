import axios from "axios";

export default {
  namespaced: true,
  state: {
    publicProject: null
  },
  mutations: {
    setProject: (state, payload) => state.publicProject = payload
  },
  actions: {
    async getPublicProject({ rootState, commit }, id) {
      try {
        commit('setIsLoading', true, { root: true });
        const project = await axios.get(`${rootState.globals.GET_PUBLIC_PROJECT_URL}/${id}`);
        commit('setProject', project.data);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    }
  }
}