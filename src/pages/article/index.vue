<template>
  <q-page padding class="row justify-center">
    <div class="row" style="width: 100%">
      <div  class="col-2"></div>
      <div class="col-8">
        <q-page-sticky position="left" :offset="[10,0]">
          <q-btn flat color="grey-5" v-if="!likeit" @click="favor" icon="bookmark" >收藏</q-btn><br/>
          <q-btn flat color="dark" v-if="likeit" @click="favor" icon="bookmark" >已收藏</q-btn>
        </q-page-sticky>
        <div>
        <br/>
        <div>
          <h4>{{article.title}}</h4>
          <strong>作者：{{article.user.nickname}}&nbsp;&nbsp;&nbsp;&nbsp;发布时间：{{formatDate(article.createdate)}}</strong>
          <br/>
          <br/>
          <br/>
          <br/>
          <div v-html="article.content"></div>
        </div>
        <HR/>
        <div>
          <q-list no-border  striped-odd v-for=" (comment, index) in articlecomments" :key="index">
            <q-item   >
              <q-item-side >
                <q-item-tile >
                  {{comment.user.nickname}}
                </q-item-tile>
              </q-item-side>
              <q-item-main>
                <!--<q-item-tile sublabel v-if="comment.parentid !== '' && comment.parentid !== null"><blockquote><small>{{ getCommentByID(comment.parentid) === null ? '' :'111'}}</small></blockquote></q-item-tile>-->
                <!--<q-item-tile sublabel v-if="comment.parentid !== '' && comment.parentid !== null"><blockquote><small>{{getCommentByID(comment.parentid)}}</small></blockquote></q-item-tile>-->
                <!--<q-item-tile sublabel v-if="comment.parentid !== '' && comment.parentid !== null"><blockquote><small >{{comment.parentid | cid }}</small></blockquote></q-item-tile>-->
                <q-item-tile label>
                  <strong>{{comment.comments}}</strong>
                </q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-item-tile >{{formatDate(comment.createdate)}}</q-item-tile>
                <!--<q-item-tile icon="reply"/>-->
              </q-item-side>
            </q-item>
            <q-item-separator inset />
          </q-list>
        </div>
        <div>
          <q-input
            v-model="articlecomment.comments"
            type="textarea"
            float-label="评论"
            rows="2"
            placeholder="请输入..."
          />
          <q-btn push rounded   class="bg-grey-5 text-white" size="xs" @click="saveComment()">评论</q-btn>
        </div>
      </div></div>
      <div  class="col-2"></div>
    </div>
  </q-page>
</template>

<script>
import {getOne, readOne} from '@/services/article'
import {favor, getLike} from '@/services/favorites'
import {getAllCommentsByArticleID, save, getCommentByID} from '@/services/articlecomment'
import {saveIt} from '@/services/msg'
import {date, Notify} from 'quasar'
import * as authGate from '@/store/auth/authGate'
import Router from '@/router/index'
export default {
  inject: ['reload'],
  name: 'index',
  data () {
    return {
      likeit: false,
      isLogin: false,
      article: {
        id: '',
        title: '',
        brief: '',
        content: '',
        createdate: null,
        user: {
          id: '',
          nickname: ''
        }
      },
      articlecomments: [],
      articlecomment: {
        id: '',
        articleid: '',
        parentid: '',
        originuserid: '',
        originusername: '',
        comments: '',
        likenums: '',
        createdate: ''
      },
      msg: {
        type: '',
        source: '',
        target: '',
        involvedtype: '',
        involvedid: '',
        content: ''
      },
      temp: ''
    }
  },
  created () {
    this.init()
  },
  filters: {
    cid: async function (id) {
      var jiba = ''
      await getCommentByID(id).then(Odin => {
        // setTimeout(console.info('等等等'), 3000)
        if (Odin.hela.code === 0) {
          jiba = id + Odin.loki.comments
          return jiba
        } else {
          return ''
        }
      }).catch(err => {
        console.info(err)
      })
      return jiba
    }
  },
  methods: {
    formatDate (timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    },
    init () {
      // this.initA(this.$route.params.id)
      // this.initB(this.$route.params.id)
      let p1 = this.getArticle(this.$route.params.id)
      let p2 = this.getComments(this.$route.params.id)
      let p3 = this.getLike(this.$route.params.id)
      let p4 = this.readOne(this.$route.params.id)
      Promise.all([p2, p1, p3, p4]).then(
        (res) => {
        }
      ).catch(
        (err) => {
          console.log(err)
        }
      )
    },
    getArticle (articleID) {
      let p = new Promise((resolve, reject) => {
        getOne(this.$route.params.id).then((result) => {
          if (!result) {
            return
          }
          const hela = result.hela
          if (hela.code === 0 || hela.code === 1) {
            this.article = result.loki
          } else {
            Notify.create({
              message: hela.info,
              position: 'bottom' // 'top', 'left', 'bottom-left'等
            })
            // this.$router.back(-1)
            return
          }
          resolve()
        }).catch(error => {
          // 这里的error是reques.js中reject后过来的error
          // 相当于前面退回的请求
          console.info(error)
          this.$router.back(-1)
        })
      })
      return p
    },
    getComments (articleID) {
      let p = new Promise((resolve, reject) => {
        getAllCommentsByArticleID(this.$route.params.id).then((result) => {
          if (!result) {
            return
          }
          const hela = result.hela
          if (hela.code === 0 || hela.code === 1) {
            // const tempC = result.loki
            // for (let i = 0; i < tempC.length; i++) {
            //   if (tempC[i].parentid !== '') {
            //     getCommentByID(tempC[i].parentid).then(Odin => {
            //       console.info(' init it done : ' + tempC[i].parentid)
            //     }).catch(err => {
            //       console.info(err)
            //     })
            //   }
            // }
            this.articlecomments = result.loki
          } else {
            Notify.create({
              message: hela.info,
              position: 'bottom' // 'top', 'left', 'bottom-left'等
            })
            // this.$router.back(-1)
            return
          }
          resolve()
        }).catch(error => {
          // 这里的error是reques.js中reject后过来的error
          // 相当于前面退回的请求
          console.info(error)
          this.$router.back(-1)
        })
      })
      return p
    },
    saveComment () {
      var _this = this
      this.articlecomment.articleid = this.article.id
      save(this.articlecomment).then(Odin => {
        _this.saveMsg()
        this.reload()
      })
    },
    saveMsg () {
      this.msg.involvedid = this.article.id
      this.msg.content = this.articlecomment.comments
      // writerid 需要新增article的字段
      this.msg.target = this.article.writer
      saveIt(this.msg)
    },
    getCommentByID (id) {
      if (id === '') {
        return ''
      }
      getCommentByID(id).then(Odin => {
        if (Odin.hela.code === 0) {
          return id + Odin.loki.comments
        } else {
          return ''
        }
      }).catch(err => {
        console.info(err)
      })
    },
    initA (articleID) {
      getOne(this.$route.params.id).then((result) => {
        if (!result) {
          return
        }
        const hela = result.hela
        if (hela.code === 0 || hela.code === 1) {
          this.article = result.loki
        }
      }).catch(error => {
        // 这里的error是reques.js中reject后过来的error
        // 相当于前面退回的请求
        console.info(error)
        this.$router.back(-1)
      })
    },
    initB (articleID) {
      getAllCommentsByArticleID(this.$route.params.id).then((result) => {
        if (!result) {
          return
        }
        const hela = result.hela
        if (hela.code === 0 || hela.code === 1) {
          // const tempC = result.loki
          // for (let i = 0; i < tempC.length; i++) {
          //   if (tempC[i].parentid !== '') {
          //     getCommentByID(tempC[i].parentid).then(Odin => {
          //       console.info(' init it done : ' + tempC[i].parentid)
          //     }).catch(err => {
          //       console.info(err)
          //     })
          //   }
          // }
          this.articlecomments = result.loki
        }
      }).catch(error => {
        console.info(error)
        this.$router.back(-1)
      })
    },
    getLike (articleID) {
      var _this = this
      _this.isLogin = authGate.getLogin()
      if (_this.isLogin !== '1') {
        _this.likeit = false
      } else {
        getLike(articleID).then(Odin => {
          if (Odin.loki === true) {
            _this.likeit = true
          } else {
            _this.likeit = false
          }
        })
      }
    },
    readOne (articleID) {
      readOne(articleID)
    },
    favor () {
      // 先判断是否登录
      this.isLogin = authGate.getLogin()
      if (this.isLogin !== '1') {
        // 未登录用户跳转登录页面
        Notify.create({
          message: '登录后即可收藏！',
          position: 'bottom' // 'top', 'left', 'bottom-left'等
        })
        Router.push({name: 'login'})
      } else {
        // 登录后，查询表
        // 根据收藏的结果设定 按钮状态
        favor(this.$route.params.id).then(Odin => {
          this.likeit = !this.likeit
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
