
const tokenKey = 'power-token'
const loginKey = 'power-login'
// 把state中的一些关键数据存储到localStorage中，保持长久记录
// localStorage与state不同之处是 state存储在内存中，在刷新页面的时候就消失了 无法永久存储 localStorage以文件的形式存储在本地
export function getToken () {
  return localStorage.getItem(tokenKey)
}

export function setToken (token) {
  localStorage.setItem(tokenKey, token)
}

export function removeToken () {
  localStorage.removeItem(tokenKey)
}

export function doNothing () {
  console.log('doNothing')
}

export function setLogin (isLogin) {
  localStorage.setItem(loginKey, isLogin)
}

export function getLogin () {
  return localStorage.getItem(loginKey)
}
export function removeLogin () {
  localStorage.removeItem(loginKey)
}
