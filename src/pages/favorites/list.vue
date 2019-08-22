<template>
  <div>
  <q-page padding class=" justify-center">
    <q-layout>
      <q-infinite-scroll :handler="refresh" :offset="offsetNum">
        <ul v-for="(favorite, index) in favorites" :key="index" class="caption" >
          <q-card  text-color="black"  style="width: auto">
            <q-card-title>
              <router-link :to="{ name: 'articleIndex', params: { id: favorite.article.id }}" target="_blank"><p>{{favorite.article.title}} </p></router-link>
              <span slot="subtitle" >{{formatDate(favorite.article.createdate)}}</span>
              <span slot="right"><q-btn dense icon="clear"  label="取消"  @click="cancelFavor(favorite.id)" ></q-btn></span>
            </q-card-title>
            <!--<q-card-actions>-->
              <!--<q-btn dense icon="clear"  label="取消"  @click="cancelFavor(favorite.id)" ></q-btn>-->
            <!--</q-card-actions>-->
          </q-card>
        </ul>
        <div class="row justify-center" style="margin-bottom: 50px;">
          <q-spinner-dots slot="message" :size="30" />
        </div>
      </q-infinite-scroll>
    </q-layout>
  </q-page>
  </div>
</template>

<script>
import {getAllLimit, cancelFavor} from '@/services/favorites'
import {date, Notify} from 'quasar'
import Router from '@/router/index'

export default {
  inject: ['reload'],
  name: 'list',
  data () {
    return {
      items: [],
      favorites: [],
      indexNum: 0,
      offsetNum: 10,
      ending: false
    }
  },
  methods: {
    formatDate (timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    },
    cancelFavor (id) {
      cancelFavor(id).then((result) => {
        const hela = result.hela
        Notify.create({
          message: hela.info,
          position: 'bottom'
        })
        this.reload()
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
        getAllLimit(_this.indexNum).then((result) => {
          var art = []
          art = result.loki
          if (art.length === 0 || art === null) {
            _this.ending = true
            done()
            return
          }
          if (_this.favorites.length === 0) {
            _this.favorites = art
          } else {
            _this.favorites = _this.favorites.concat(art)
          }
          _this.indexNum++
        }).catch(res => {
          done()
          _this.ending = true
          Router.push({name: 'login'})
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
