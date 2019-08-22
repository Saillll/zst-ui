<template>
  <div v-touch-swipe.up.left="swipeLeft" >
  <q-layout>
    <q-page-container>
      <q-page>
          <div class="fixed-center text-center" >
            <q-field >
              <q-input type="text" clearable v-model="user.u" placeholder="请输入登录名" autofocus  float-label="登录名" @blur="$v.user.u.$touch"/>
              <!--<label class="inputtext" v-if="!$v.user.u.required">密码不能小于{{$v.user.u.$params.maxLength.max}}位</label>-->
              <div class="q-field-with-error" v-if="!$v.user.u.required && $v.user.u.$error ">
                <div class="q-field-bottom row no-wrap q-field-with-error" >
                  <div class="q-field-error col">登录名不能为空</div>
                </div>
              </div>
              <div class="q-field-with-error" v-if="!$v.user.u.maxLength && $v.user.u.$error">
                <div class="q-field-bottom row no-wrap ">
                  <div class="q-field-error col">登录名不能超过{{$v.user.u.$params.maxLength.max}}位</div>
                </div>
              </div>
              <div class="q-field-with-error" v-if="!$v.user.u.isUnique && $v.user.u.$error">
                <div class="q-field-bottom row no-wrap ">
                  <div class="q-field-error col">登录名已经存在</div>
                </div>
              </div>
            </q-field>
            <q-field>
              <!--<q-field :error="$v.user.nickname.$error " error-label="请输入正确的昵称">-->
              <q-input type="text" clearable class="inputtext" v-model="user.nickname" placeholder="昵称"  float-label="昵称" @blur="$v.user.nickname.$touch" />
              <div class="q-field-with-error" v-if="!$v.user.nickname.required && $v.user.nickname.$error ">
                <div class="q-field-bottom row no-wrap q-field-with-error">
                  <div class="q-field-error col">昵称不能为空</div>
                </div>
              </div>
              <div class="q-field-with-error" v-if="!$v.user.nickname.maxLength && $v.user.nickname.$error">
                <div class="q-field-bottom row no-wrap ">
                  <div class="q-field-error col">昵称不能超过{{$v.user.nickname.$params.maxLength.max}}位</div>
                </div>
              </div>
            </q-field>
            <q-field>
              <q-input type="password" clearable class="inputtext" v-model="user.p" placeholder="密码" float-label="密码" @blur="$v.user.p.$touch" />
              <div class="q-field-with-error" v-if="!$v.user.p.required && $v.user.p.$error ">
                <div class="q-field-bottom row no-wrap q-field-with-error">
                  <div class="q-field-error col">密码不能为空</div>
                </div>
              </div>
              <div class="q-field-with-error" v-if="!$v.user.p.maxLength && $v.user.p.$error">
                <div class="q-field-bottom row no-wrap ">
                  <div class="q-field-error col">密码不能超过{{$v.user.p.$params.maxLength.max}}位</div>
                </div>
              </div>
            </q-field>
            <q-field>
              <q-input type="password" clearable class="inputtext" v-model="user.dualpassword" placeholder="确认密码" float-label="确认密码" @blur="$v.user.dualpassword.$touch" />
              <div class="q-field-with-error" v-if="$v.user.dualpassword.$error ">
                <div class="q-field-bottom row no-wrap q-field-with-error">
                  <div class="q-field-error col">请输入相同的密码</div>
                </div>
              </div>
            </q-field>
            <br>
            <q-btn push round color="green" @click="register">
              保存
            </q-btn>
            <br>
            <br>
            <br>
            <span class="text-grey"><q-icon name="touch_app" size="2rem" /><q-icon name="arrow_back" size="2rem" /> 向左滑动登陆 </span>
          </div>
      </q-page>
    </q-page-container>
  </q-layout>
  </div>
</template>

<script>
import { register, dualCheck } from '@/services/login'
import Router from '@/router/index'
import { required, maxLength, sameAs } from 'vuelidate/lib/validators'
import { Notify } from 'quasar'
export default {
  name: 'register',
  data () {
    return {
      user: {
        u: '',
        p: '',
        nickname: '',
        dualpassword: ''
      }
    }
  },
  validations: {
    user: {
      u: {
        required,
        maxLength: maxLength(15),
        async isUnique (value) { // 异步校验用户名是否已注册
          if (value === '') return Boolean(true)
          var uni = Boolean(true)
          await dualCheck(value).then(Odin => {
            if (Odin.loki !== null) {
              uni = Boolean(false)
            }
          }).catch(error => {
            console.info(error)
            uni = Boolean(false)
          })
          return uni
        }
      },
      nickname: {
        required,
        maxLength: maxLength(20)
      },
      p: {
        required,
        maxLength: maxLength(32)
      },
      dualpassword: {
        required,
        maxLength: maxLength(32),
        sameAsPassword: sameAs('p')
      }
    }
  },
  methods: {
    register () {
      let user = this.user
      register(user).then(Odin => {
        if (Odin.hela.code === 0) {
          Notify.create({
            message: '注册成功，请登录！',
            position: 'bottom'
          })
          Router.push({name: 'login'})
        } else {
          Notify.create({
            message: Odin.hela.info,
            position: 'bottom'
          })
        }
      })
    },
    swipeLeft (obj) {
      Router.replace({name: 'login'})
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
