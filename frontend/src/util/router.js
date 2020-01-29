import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../util/store/index'
import ProjectList from '../components/projects/ProjectList'
import EndpointsContainer from '../components/endpoints/EndpointsContainer'
import EditEndpointHandler from '../components/endpoints/EditEndpointHandler'
import About from '../components/About'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup';

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/endpoints' },
    { path: '/projects', component: ProjectList },
    { path: '/endpoints', component: EndpointsContainer },
    { path: '/endpoint/:id', component: EditEndpointHandler },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup }
  ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('token');
  if (!isAuth && to.path !== '/login' && to.path !== '/signup' && to.path !== '/about') {
    store.commit('auth/setToken', null);
    return next('/login');
  }
  return next();
})

export default router
