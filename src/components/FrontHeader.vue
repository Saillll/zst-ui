<template>
    <q-layout-header :reveal="reveal">
      <q-toolbar color="dark">
        <!--<q-btn flat round icon="menu" @click="left = !left"/>-->
        <q-toolbar-title>
          <a href="/" class="text-white" target="_self">
            <q-btn flat icon="fab fa-github">Quasar</q-btn>
          </a>
        </q-toolbar-title>
        <q-btn flat round dense  v-if="isLogin === '1' " icon="account_circle"  color="green"   @click="toLogin()" v-touch-hold="logout">
          <q-context-menu>
            <q-list link separator style="min-width: 150px; max-height: 300px;">
              <q-item v-close-overlay @click.native="logout()">
                <q-item-main label="注销" sublabel="Logout" />
              </q-item>
            </q-list>
          </q-context-menu>
        </q-btn>
        <q-btn flat round dense  v-else icon="account_circle"     @click="toLogin()" ></q-btn>
        <!--<q-btn flat round dense  v-else icon="account_circle"     @click="toLogin()" ><q-chip floating color="red">2</q-chip></q-btn>-->
      </q-toolbar>
    </q-layout-header>
    <!--<q-page-container fixed-center>-->
      <!--<router-view/>-->
    <!--</q-page-container>-->
</template>

<script>
import * as authGate from '../store/auth/authGate'
import Router from '../router'
export default {
  name: 'FrontHeader',
  data () {
    return {
      reveal: true,
      left: true,
      token: '',
      isLogin: '0'
    }
  },
  created () {
    this.isLogin = authGate.getLogin()
    this.$store.commit('setLogin', this.isLogin)
  },
  methods: {
    removeToken () {
      this.token = authGate.getToken()
      authGate.removeToken()
      authGate.removeLogin()
      this.$store.commit('setLogin', '0')
      this.$store.commit('setToken', '')
    },
    toLogin () {
      if (this.isLogin === '1') {
        Router.push({name: 'home'})
      } else {
        // authGate.removeToken()
        // authGate.removeLogin()
        authGate.removeToken()
        authGate.removeLogin()
        this.$store.commit('setLogin', '0')
        this.$store.commit('setToken', '')
        Router.push({name: 'login'})
      }
    },
    logout () {
      // alert(111111)
      authGate.removeToken()
      authGate.removeLogin()
      this.$store.commit('setLogin', '0')
      this.$store.commit('setToken', '')
      Router.push({name: 'home'})
    }

  }
}
</script>

<style>
</style>
