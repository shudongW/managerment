// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueRouter from 'vue-router'
import App from './App'
// import Routes from './assets/routes'
import router from '@/router'
import store from '@/store'
import Vuex from 'vuex'
// import VueResource from 'vue-resource'
// mport qs from 'qs'

Vue.use(ElementUI)
// Vue.use(VueResource)
Vue.use(Vuex)
// Vue.use(VueRouter)

Vue.config.productionTip = false

// const router = new VueRouter(RouterConfig)
/* eslint-disable no-new */

/* 创建挂载点至#app元素，将内容显示在index.html页面 */
new Vue({
  el: '#app',
  router,
  store,
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
}).$mount('#app')
