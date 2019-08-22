<template>
  <q-page>
    <div>
      <div class="layout-padding">
        <q-field label="登录名">
          <q-input v-model="user.u"  readonly/>
        </q-field>
        <!--<q-field label="密码">-->
          <!--<q-input v-model="user.p" />-->
        <!--</q-field>-->
        <!--<q-field label="头像">-->
          <!--<q-input v-model="user.photo"  />-->
        <!--</q-field>-->
        <q-field label="昵称">
          <q-input v-model="user.nickname"  />
        </q-field>
        <q-field label="电子邮件">
          <q-input v-model="user.email"  />
        </q-field>
        <q-field label="电话">
          <q-input v-model="user.phone"  />
        </q-field>
      </div>
      <q-btn push class="bg-grey-5 text-white" @click="save">保存</q-btn>

    </div>
  </q-page>
</template>

<script>
import { getSelf, save } from '@/services/user'
import { Notify } from 'quasar'
import Router from '@/router/index'

export default {
  inject: ['reload'],
  name: 'index',
  data () {
    return {
      a: 'ffff',
      user: {
        id: '',
        u: '',
        p: '',
        salt: '',
        nickname: '',
        photo: '',
        email: '',
        phone: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let _this = this
      getSelf().then(odin => {
        if (odin.hela.code === 0) {
          _this.user = odin.loki
        }
      }).catch(res => {
        Router.push({name: 'login'})
      })
    },
    save () {
      save(this.user).then(odin => {
        if (odin.hela.code === 0) {
          Notify.create({
            message: '保存成功',
            position: 'bottom'
          })
          this.reload()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
