import Vue from 'vue'
import VueRouter from 'vue-router'
import EndpointsContainer from '../components/endpoints/EndpointsContainer'
import EditEndpointHandler from '../components/endpoints/EditEndpointHandler'
import About from '../components/About'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/endpoints' },
    { component: EndpointsContainer, path: '/endpoints' },
    { component: EditEndpointHandler, path: '/endpoint/:id' },
    { component: About, path: '/about' }
  ],
  mode: 'history'
})

export default router
