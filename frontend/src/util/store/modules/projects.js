export default {
  namespaced: true,
  state: {
    projectList: null,
    currentProject: null
  },
  mutations: {
    setProjects(state, payload) {
      state.projectList = payload;
    },
    setCurrentProject(state, payload) {
      state.currentProject = payload;
    }
  },
  actions: {
    async getProjects({ rootState, commit }) {
      try {
        commit('setIsLoading', true, { root: true });
        const projects = await rootState.axios.get(rootState.globals.GET_ALL_PROJECTS_URL);
        commit('setProjects', projects.data);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async getProject({ rootState, commit }, id) {
      try {
        commit('setIsLoading', true, { root: true });
        const project = await rootState.axios.get(`${rootState.globals.GET_PROJECT_URL}/${id}`);
        commit('setCurrentProject', project.data);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async createProject({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        rootState.axios.post(rootState.globals.CREATE_PROJECT_URL, payload);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async updateProject({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        rootState.axios.patch(rootState.globals.UPDATE_PROJECT_URL, payload);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async replaceProject({ rootState, commit }, payload) {
      try {
        commit('setIsLoading', true, { root: true });
        rootState.axios.put(rootState.globals.REPLACE_PROJECT_URL, payload);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
    async deleteProject({ rootState, commit }, id) {
      try {
        commit('setIsLoading', true, { root: true });
        rootState.axios.delete(`${rootState.globals.DELETE_PROJECT_URL}/${id}`);
        commit('setIsLoading', false, { root: true });
      } catch (error) {
        commit('setIsLoading', false, { root: true });
      }
    },
  }
}