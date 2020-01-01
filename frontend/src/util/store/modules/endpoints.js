export default {
  namespased: true,
  state: {
    endpointsList: null
  },
  mutations: {
    setEndpoint(state, payload) {
      state.endpointsList = payload;
    }
  }
}