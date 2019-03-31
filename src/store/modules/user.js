import { getToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/login'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = ''
    }
  },
  actions: {
    // 登录
    LoginByEmail ({ commit }, ruleForm) {
      return new Promise((resolve, reject) => {
        login(ruleForm.username, ruleForm.password).then(response => {
          const data = response.data
          console.log(response.data)
          sessionStorage.setItem('Authorization', response.data)
          commit('SET_TOKEN', data)
          commit('SET_NAME', ruleForm.username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_UID', data.uid)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          sessionStorage.removeItem('Authorization')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        sessionStorage.removeItem('Authorization')
        alert('has logout')
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole ({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role])
        commit('SET_TOKEN', role)
        sessionStorage.setItem('Authorization', role)
        resolve()
      })
    }
  }
}

export default user
