import axios from 'axios'
import * as authGate from '../store/auth/authGate'
import { Notify } from 'quasar'
import Router from '@/router/index'
// export default ({ Vue }) => {
//   Vue.prototype.$axios = axios
// }

//  初始化 请求
const service = axios.create({
  baseURL: process.env.API, // api的base_url
  timeout: 10000
})
//  拦截器 request
service.interceptors.request.use(config => {
  // 加上权限过滤，发送请求前 的操作
  // console.info(config.headers['Content-Type'])
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // config.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
  // config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  const token = authGate.getToken()
  // config.headers['Access-Control-Allow-Origin'] = '*'
  // config.headers['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type'
  // config.headers['Access-Control-Allow-Methods'] = 'PUT,POST,GET,DELETE,OPTIONS'
  // config.headers['Authorization'] = token
  // // if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
  // //   config.headers.Authorization = `token ${store.state.token}`
  // // }
  if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers['Authorization'] = token// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['Access-Control-Allow-Origin'] = '*'
  }
  return config
}, error => {
  // 过滤掉错误请求后 的操作
  console.log(error)

  return Promise.reject(error)
})
//  拦截器 response
service.interceptors.response.use(response => {
  // 返回的各种参数
  let result = response.data
  const hela = result.hela
  /**
   * 只判断ASDASD
   */
  if (hela.code !== 0) { // 失败的返回结果
    if (hela.code === 1) { //  附带结果并刷新token
      const thor = result.thor
      authGate.removeToken()
      authGate.removeLogin()
      authGate.setToken(thor)
      authGate.setLogin('1')
      this.$store.commit('setLogin', '1')
      this.$store.commit('setToken', thor)
    } else {
      // 用户访问了需要token的页面，但是用户信息过期了，直接跳转登陆页面
      if (hela.code === 603) {
        Notify.create({
          message: hela.info,
          position: 'bottom'
        })
        debugger
        authGate.removeToken()
        authGate.removeLogin()
        this.$store.commit('setLogin', '0')
        this.$store.commit('setToken', '')
        Router.push({name: 'login'})
        return Promise.reject(hela.info)
      } else {
        // 其他的错误，直接提示错误信息，并且不做任何跳转
        Notify.create({
          message: hela.info,
          position: 'bottom'
        })
        return Promise.reject(hela.info)
      }
      // Router.push('/login')
    }
  }
  return result
  // let status = response.status
  // let headers = response.headers
  // let statusText = response.statusText
  // let config = response.config
  // console.log('result' + result)
  // console.log('status' + status)
  // console.log('headers' + headers)
  // console.log('statusText' + statusText)
  // console.log('config' + config)
  // 可以根据返回的status 进行不同的判断操作 如果不是200则是失败，404则提示  之类的信息
  // 本处 直接return返回值
}, error => {
  if (error.response && error.response.status === 401) {
    authGate.removeToken()
    authGate.removeLogin()
    // if (error.config.url.indexOf('logout') === -1) {
    //   Notify.create({
    //     message: this.$t('loginexpired')
    //   })
    // }
    Notify.create({
      message: '请先登录'
    })
    setTimeout(() => {
      Router.push({name: 'login'})
    }, 1000)
  } else if (error.response && error.response.status === 500) {
    Notify.create({
      message: '系统错误',
      position: 'bottom'
    })
  } else if (error.message.indexOf('timeout') > -1) {
    Notify.create({
      message: '请求超时',
      position: 'bottom'
    })
  } else if (error === '403') {

  } else {
    Notify.create({
      message: '错误',
      position: 'bottom'
    })
  }
  return Promise.reject(error)
})

export default service
