<template>
  <q-page padding class=" justify-center">
    <q-btn align="between" class="btn-fixed-width" color="grey-5" label="写文章" icon="add_circle" @click="toForm()" />
    <q-layout>
      <q-infinite-scroll :handler="refresh" :offset="offsetNum">
        <ul v-for="(article, index) in articles" :key="index" class="caption" >
            <q-card color="grey-5" text-color="black"  style="width: auto">
              <q-card-title>
                <p>{{ index + 1 }} {{article.title}} </p>
                <span slot="subtitle" >{{formatDate(article.createdate)}}</span>
              </q-card-title>
              <q-card-actions>
                <!--<q-btn dense icon="comment" color="grey-5" label="评论"></q-btn>-->
                <q-btn dense icon="edit" color="grey-5" label="编辑"  @click="toForm(article.id)" ></q-btn>
                <q-btn dense icon="clear" color="grey-5" label="删除"  @click="deleteOne(article.id)" ></q-btn>
                <!--<q-btn dense icon="view_comfy" color="grey-5" label="详情" :to="{ name: 'articleIndex', params: { id: article.id }}" ></q-btn>-->
              </q-card-actions>
            </q-card>
        </ul>
        <div class="row justify-center" style="margin-bottom: 50px;">
          <q-spinner-dots slot="message" :size="30" />
        </div>
      </q-infinite-scroll>
    </q-layout>
  </q-page>
</template>

<script>
import {queryAllLimit, deleteOne} from '@/services/article'
import {date, Notify} from 'quasar'
import Router from '@/router/index'

export default {
  inject: ['reload'],
  name: 'list',
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
    toForm (id) {
      Router.push({name: 'formBlog', params: {id: id}})
      // if (id === '' || id === null) {
      //   Router.push({name: 'formBlog', params: {id: id}})
      // } else {
      //   const formBlog = Router.resolve({
      //     name: 'formBlog',
      //     params: {
      //       id: id
      //     }
      //   })
      //   window.open(formBlog.href, '_blank')
      // }
    },
    formatDate (timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    },
    fillall () {
      queryAllLimit().then((result) => {
        this.articles = result.loki
        // console.log(this.users)
      })
    },
    deleteOne (id) {
      deleteOne(id).then((result) => {
        const hela = result.hela
        Notify.create({
          message: hela.info,
          position: 'bottom'
        })
        // location.reload()
        // this.$router.go(0)
        this.reload()
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
        return
      }
      setTimeout(() => {
        queryAllLimit(_this.indexNum).then((result) => {
          var art = []
          art = result.loki
          if (art.length === 0 || art === null) {
            _this.ending = true
            return
          }
          // if (_this.users.length === 0) {
          //   _this.users = uuu
          // } else {
          //   for (var i = 0; i < uuu.length; i++) {
          //     _this.users.push(uuu[i])
          //   }
          // }
          if (_this.articles.length === 0) {
            _this.articles = art
          } else {
            _this.articles = _this.articles.concat(art)
          }
          _this.indexNum++
        }).catch(res => {
          _this.ending = true
          Router.push({name: 'login'})
        })
        done()
      }, 100)
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
