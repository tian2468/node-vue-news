import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsEdit from '../views/news/NewsEdit.vue'
import NewsList from '../views/news/NewsList.vue'
import UserEdit from '../views/user/UserEdit.vue'
import UserList from '../views/user/UserList.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    isPublic: true,
    title: '登录'
  }
}, {
  path: '/',
  name: 'Main',
  redirect: '/categories/list',
  component: () => import('../views/Main.vue'),
  children: [{
    path: '/categories/edit',
    name: 'CategoryEdit',
    component: () => import('../views/category/CategoryEdit.vue')
  }, {
    path: '/categories/list',
    name: 'CategoryList',
    component: () => import('../views/category/CategoryList.vue')
  }, {
    path: '/image/upload',
    name: 'ImageUpload',
    component: () => import('../views/image/ImageUpload.vue')
  }, {
    path: '/image/list',
    name: 'ImageList',
    component: () => import('../views/image/ImageList.vue')
  }, {
    path: '/news/edit',
    name: 'NewsEdit',
    component: NewsEdit
  }, {
    path: '/news/list',
    name: 'NewsList',
    component: NewsList
  }, {
    path: '/user/edit',
    name: 'UserEdit',
    component: UserEdit
  }, {
    path: '/user/list',
    name: 'UserList',
    component: UserList
  }]
}]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
