import Vue from 'vue'
import VueRouter from 'vue-router'
import EndpointsContainer from '../components/endpoints/EndpointsContainer'
import EditEndpointHandler from '../components/endpoints/EditEndpointHandler'
import About from '../components/About'
import Login from '../components/Login'
import Signup from '../components/Signup';

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/endpoints' },
    { path: '/endpoints', component: EndpointsContainer },
    { path: '/endpoint/:id', component: EditEndpointHandler },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup }
  ],
  mode: 'history'
})

export default router
