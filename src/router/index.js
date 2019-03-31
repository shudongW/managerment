import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/index'
import Error from '@/views/404'
import store from '@/store'
Vue.use(VueRouter)

// 静态路由
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    hidden: true
  }
]
// 动态路由
export const asyncRouterMap = [
  {
    path: '/index',
    name: '',
    meta: {
      title: '权限管理',
      icon: 'peoples',
      'keepalive': false
    },
    children: [
      {
        path: '/a'
      }
    ]
  },
  {
    path: '/error',
    component: Error
  },
  {
    path: '*', redirect: '/error', hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 页面刷新时，重新赋值token
if (sessionStorage.getItem('Authorization')) {
  store.commit('SET_TOKEN', sessionStorage.getItem('Authorization'))
}

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    // 这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
