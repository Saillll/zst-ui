<template>
  <!--<q-layout>-->
  <!--<q-layout padding class=" justify-center" >-->
  <div>
    <q-layout padding class=" justify-center" >
    <div>
      <front-header></front-header>
    </div>
      <div class="row" style="width: 100%">
        <div  class="col-2"></div>
        <div  class="col-8">
          <div style="margin-top: 65px;">
            <q-infinite-scroll :handler="refresh" :offset="offsetNum" >
            <ul v-for="(article, index) in articles" :key="index" class="caption">
              <router-link :to="{ name: 'articleIndex', params: { id: article.id }}" target="_blank">
                <!--<router-link :to="{ name: 'articleIndex', params: { id: article.id }}">-->
                <!--<q-btn small round push glossy dense icon="edit" color="primary"></q-btn>-->
                <!--<q-item :to="{ name: 'articleIndex', params: { id: article.id }}" >-->
                <q-card color="grey-4" text-color="black" style="width: auto" >
                  <q-card-title>
                    <p>{{ index + 1 }} {{article.title}}     </p>
                    <span slot="subtitle"><i class="material-icons">remove_red_eye</i>&nbsp;{{article.viewnums}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <!--<span slot="subtitle"><i class="material-icons">thumb_up</i>&nbsp;{{article.likenums}}&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                    <span slot="subtitle">{{formatDate(article.createdate)}}</span>
                    <span slot="subtitle">&nbsp;&nbsp;&nbsp;&nbsp;{{article.user.nickname}}</span>
                  </q-card-title>
                  <q-card-separator/>
                </q-card>
                <!--</q-item>-->
              </router-link>
            </ul>
            <div class="row justify-center" style="margin-bottom: 50px;">
              <q-spinner-dots slot="message" :size="30"/>
            </div>
          </q-infinite-scroll>
          </div>
        </div>
        <div  class="col-2"></div>
      </div>
    </q-layout>
  </div>
  <!---->
  <!--</q-layout>-->
</template>

<script>
import {queryAll} from '@/services/article'
import FrontHeader from '@/components/FrontHeader'
import { date } from 'quasar'
export default {
  name: 'mainview',
  components: {
    FrontHeader
  },
  data () {
    return {
      items: [],
      articles: [],
      indexNum: 0,
      offsetNum: 10,
      ending: false
    }
  },
  methods: {
    formatDate (timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    },
    fillall () {
      queryAll().then((result) => {
        this.articles = result.loki
        // console.log(this.users)
      })
    },
    refresh (index, done) {
      var _this = this
      if (_this.ending === true) {
        // Notify.create({
        //   message: '没有更多内容',
        //   position: 'bottom'
        // })
        return
      }
      if (_this.indexNum > 1 && _this.articles.length === 0) {
        stop()
        // Notify.create({
        //   message: '没有更多内容',
        //   position: 'bottom'
        // })
        _this.indexNum++
        done()
        return
      }
      setTimeout(() => {
        queryAll(_this.indexNum).then((result) => {
          var art = []
          art = result.loki
          if (art.length === 0 || art === null) {
            _this.ending = true
            done()
            return
          }
          if (_this.articles.length === 0) {
            _this.articles = art
          } else {
            _this.articles = _this.articles.concat(art)
          }
          _this.indexNum++
        }).catch(res => {
          _this.ending = true
        })
        done()
      }, 500)
    }
  }
}
</script>
<style lang="stylus" scoped>
  a {
    color: #008489;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  div {
    no-wrap
  }
  p {
    word-break: break-all
  }
</style>
