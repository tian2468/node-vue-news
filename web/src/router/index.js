import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Main',
  redirect: '/home'
}, {
  path: '/home',
  name: 'Home',
  component: Home
}, {
  path: '/detail/:id',
  name: 'Detail',
  component: Detail
}]

const router = new VueRouter({
  routes
})

export default router
