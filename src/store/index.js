import Vue from 'vue'
import Vuex from 'vuex'
import getter from './getter'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getter
})
