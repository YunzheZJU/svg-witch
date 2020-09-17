import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Version2',
    name: 'Version 2',
    // route level code-splitting
    // this generates a separate chunk (Version2.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "Version2" */ '../views/Version2.vue')
    },
  },
  {
    path: '/Version3',
    name: 'Version 3',
    component: function () {
      return import(/* webpackChunkName: "Version3" */ '../views/Version3.vue')
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
