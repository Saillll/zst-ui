// import { setToken } from '../../auth/authGate'

const user = {
  state: {
    token: '',
    user: {
      u: '', // 用户名
      n: '' // 昵称
    },
    isLogin: '0'
  },
  mutations: {
    setToken: function (state, token) {
      state.token = token
    },
    setLogin: function (state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {
    push_token: function (context, token) {
      return context.commit('setToken', token)
    },
    // set_login: function ({commit}, isLogin) {
    //   return commit('setLogin', isLogin)
    // }
    set_login: function (context, isLogin) {
      return context.commit('setLogin', isLogin)
    }
  },
  getters: {
    getToken: function (state) {
      return state.token
    },
    getIsLogin: function (state) {
      return state.isLogin
    }
  }
}
export default user
