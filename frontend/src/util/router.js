import Vue from 'vue'
import VueRouter from 'vue-router'
import EndpointsContainer from '../components/endpoints/EndpointsContainer'
import EndpointData from '../components/endpoints/EndpointData'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/endpoints' },
    { component: EndpointsContainer, path: '/endpoints' },
    { component: EndpointData, path: '/endpoint/:id'}
  ],
  mode: 'history'
})

export default router
