import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login.vue'
import Main from '../page/main.vue'
import Result from '../page/result.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/h5/psychological-test/login',
      name: 'login',
      component: Login
    },
    {
      path: '/h5/psychological-test/main',
      name: 'main',
      component: Main
    },
    {
      path: '/h5/psychological-test/result',
      name: 'result',
      component: Result
    }
  ]
})
