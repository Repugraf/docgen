import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentObject: {
      type: "object",
      value: {
        a: {
          type: "number",
          value: 1
        },
        b: {
          type: "string",
          value: "test"
        },
        c: {
          type: "object",
          value: {
            d: {
              type: "boolean",
              value: false
            },
            g: {
              type: "dynamic",
              value: null
            }
          }
        },
        f: {
          type: "object",
          value: {}
        }
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
