import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerGlobalComponents from './util/components'

Vue.config.productionTip = false

registerGlobalComponents(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
