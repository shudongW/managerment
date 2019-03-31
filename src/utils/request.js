import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'
import router from '@/router'
Vue.use(VueAxios, axios)
// Vue.prototype.$ajax = axios

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// -------------------------------------------请求拦截器 start------------------------------------------------->
service.interceptors.request.use(config => {
  // // 在发送请求之前做些什么
  // //判断是否存在token，如果存在将每个页面header都添加token
  // let token = sessionStorage.getItem('token') 也可以获取token
  // 非 HOST_PROXY_ADMIN 域名下的请求，均不拦截
  config.emulateJSON = true
  config.withCredentials = true
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  if (store.state.token) {
    // 把token加入到默认请求参数中
    // config.headers.common['Authorization'] = store.state.token
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// ---------------------------------------------请求拦截器 end------------------------------------------------->

// ---------------------------------------------请求响应器 star------------------------------------------------>
service.interceptors.request.use(response => {
  // ①10010 token过期（30天） ②10011 token无效
  if (response.code === 10010 || response.code === 10011) {
    sessionStorage.removeItem('token')
    // sessionStorage.clear()
    // 删除已经失效或过期的token(不删除也可以，因为登录后覆盖)
    router.replace({
      path: '/login'
      // 到登录页重新获取token
    })
  } else if (response.data) {
    // 判断token是否存在，如果存在说明需要更新token
    sessionStorage.setItem('token', response.data)
    // Storage.localSet('token', response.data.token)
    // 覆盖原来的token(默认一天刷新一次)
  }
  return response
}, error => {
  return Promise.reject(error)
})
// ---------------------------------------------请求响应器 end------------------------------------------------>
export default service
