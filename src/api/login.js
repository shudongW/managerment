import request from '@/utils/request'

export function login (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function logout () {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

export function getInfo (token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
