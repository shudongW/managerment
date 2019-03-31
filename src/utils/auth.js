// Token 管理
const TokenKey = 'Authorization'
export function getToken () {
  return sessionStorage.getItem(TokenKey)
}

export function setToken (token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return sessionStorage.removeItem(TokenKey)
}
