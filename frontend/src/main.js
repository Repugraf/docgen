import Vue from './util/VueConfig'
import App from './App.vue'
import router from './util/router'
import store from './util/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
