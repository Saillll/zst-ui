<template>
  <div>
    <q-layout>
      <div>
        <front-header></front-header>
      </div>
      <div>
        <!--<div class="col-2" style="width: 200px;height:100%;background-color: lightgrey">-->
        <q-layout-drawer side="left" v-model="left" :overlay="overlay" :behavior="behavior" :breakpoint="breakpoint"
                         :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null" :content-style="{padding: '2px'}">
          <q-scroll-area class="fit">
            <!--<q-list-header></q-list-header>-->
            <q-item :to="{name: 'blog'}">
              <!--<q-item :to="{name: 'blog'}">-->
              <q-item-side icon="subject"/>
              <q-item-main label="博客管理"/>
            </q-item>
            <q-item :to="{name: 'selfsettings'}">
              <q-item-side icon="settings"/>
              <q-item-main label="个人设置"/>
            </q-item>
            <q-item :to="{name: 'privatemsg'}">
              <q-item-side icon="sms"/>
              <q-item-main label="消息" sublabel=""/>
            </q-item>
            <q-item :to="{name: 'favorites'}">
              <q-item-side icon="folder_special"/>
              <q-item-main label="收藏"/>
            </q-item>
          </q-scroll-area>
        </q-layout-drawer>
      </div>
      <!--</div>-->
      <!--<div class="col-8">-->
      <div>
        <q-page-container>
            <router-view></router-view>
        </q-page-container>
      </div>
      <!--</div>-->

    </q-layout>
  </div>
</template>

<script>
import FrontHeader from '@/components/FrontHeader'

export default {
  name: 'home',
  components: {
    FrontHeader
  },
  data () {
    return {
      behavior: 'default',
      overlay: false,
      breakpoint: 992,
      isLogin: '0',
      left: true
    }
  }
}
</script>

<style scoped>

</style>
