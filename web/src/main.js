import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/reset.scss'
import './assets/style/base.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
import http from './http'
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
