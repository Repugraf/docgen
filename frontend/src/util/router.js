import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../util/store/index'
import ProjectsContainer from '../components/projects/ProjectsContainer'
import Project from '../components/projects/Project'
import EditProject from '../components/projects/EditProject'
import EndpointsContainer from '../components/endpoints/EndpointsContainer'
import EditEndpointHandler from '../components/endpoints/EditEndpointHandler'
import About from '../components/About'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import ChangePassword from '../components/auth/ChangePassword'
import ChangePasswordEmail from '../components/auth/ChangePasswordEmail'
import ChangePasswordNewPassword from '../components/auth/ChangePasswordNewPassword'
import PublicProject from '../components/public/PublicProject'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/projects' },
    { path: '/projects', component: ProjectsContainer },
    { path: '/project/:id', component: Project },
    { path: '/project-edit/:id', component: EditProject },
    { path: '/endpoints', component: EndpointsContainer },
    { path: '/endpoint/:id', component: EditEndpointHandler },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    {
      path: '/change-password', component: ChangePassword, name: 'change-password', children: [
        { path: 'email', component: ChangePasswordEmail, name: 'change-password' },
        { path: 'new-password', component: ChangePasswordNewPassword, name: 'change-password' }
      ]
    },
    { path: '/public/:id', component: PublicProject, name: "public" }
  ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('token');
  if (!isAuth && to.path !== '/login' && to.path !== '/signup' &&
    to.path !== '/about' && to.name !== 'public' && to.name !== 'change-password') {
    store.commit('auth/setToken', null);
    return next('/login');
  }
  return next();
})

export default router
