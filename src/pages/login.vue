<template>
  <div v-touch-swipe.up.right="swipeRight" >
  <q-layout>
    <q-page-container>
      <q-page>
          <div class="fixed-center text-center" >
            <q-input type="text" clearable class="inputtext" v-model="user.u" placeholder="用户名" autofocus />
            <q-input type="password" clearable class="inputtext" v-model="user.p" placeholder="密码" />
            <br>
            <q-btn push round color="green" @click="login">
              登陆
            </q-btn>
            <br>
            <br>
            <br>
            <span class="text-grey"><q-icon name="touch_app" size="2rem" /><q-icon name="arrow_forward" size="2rem" /> 向右滑动注册 </span>
          </div>
      </q-page>
    </q-page-container>
  </q-layout>
  </div>
</template>

<script>
import { login } from '@/services/login'
import * as authGate from '@/store/auth/authGate'
import Router from '@/router/index'
export default {
  name: 'login',
  data () {
    return {
      user: {
        u: '',
        p: ''
      },
      articles: '',
      hasLogin: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'register' && this.hasLogin === true) {
      // history.go(-2)
      next({path: '/'})
    }
    next()
  },
  methods: {
    login () {
      var _this = this
      let user = this.user
      login(user).then((Odin) => {
        if (Odin.hela.code === 0) {
          authGate.setToken(Odin.loki) // 先存储到localStorage中
          authGate.setLogin('1')
          this.$store.commit('setToken', Odin.loki) // 再存储到内存的state中：同步
          // this.$store.dispatch('push_token', Odin.loki) // 再存储到内存的state中：异步
          this.$store.commit('setLogin', '1')
          _this.hasLogin = true
          this.$router.go(-1) // 登陆后返回上个页面
          // alert(this.$store.getters.getIsLogin)
          // this.$router.push('/')
        }
      })
    },
    register () {
    },
    swipeRight (obj) {
      Router.replace({name: 'register'})
    }
  }
}
</script>

<style lang="stylus" scoped>
  div {
    background-color lightgrey
  }
  .inputtext {
    color grey
  }
</style>
