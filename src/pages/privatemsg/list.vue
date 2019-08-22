<template>
  <q-page class="justify-center">
    <q-layout>
      <div>
        <br/>
        <div style="width: 10%" >
          <!--<q-btn push class="bg-grey-5 text-white" @click="sendMSSG">go</q-btn>-->
          <q-select
            radio
            inverted
            color="grey-5"
            float-label=""
            v-model="select"
            :options="options"
            @input="readSwitch"
          />
        </div>
        <q-list no-border  striped-odd v-for=" (msg, index) in msgs" :key="index">
          <q-item   >
            <!--<q-item-side >-->
              <!--<q-item-tile >-->
                <!--{{comment.user.nickname}}-->
              <!--</q-item-tile>-->
            <!--</q-item-side>-->
            <q-item-main>
              <!--<q-item-tile sublabel v-if="comment.parentid !== '' && comment.parentid !== null"><blockquote><small>{{ getCommentByID(comment.parentid) === null ? '' :'111'}}</small></blockquote></q-item-tile>-->
              <!--<q-item-tile sublabel v-if="comment.parentid !== '' && comment.parentid !== null"><blockquote><small>{{getCommentByID(comment.parentid)}}</small></blockquote></q-item-tile>-->
              <!--<q-item-tile sublabel v-if="comment.parentid !== '' && comment.parentid !== null"><blockquote><small >{{comment.parentid | cid }}</small></blockquote></q-item-tile>-->
              <q-item-tile label lines="5">
                <!--“<strong>{{msg.sourceUser.nickname}}</strong>”对你的文章“<strong><router-link :to="{ name: 'articleIndex', params: { id: msg.involvedArticle.id }}" target="_blank" @click.native="readit(msg.involvedArticle.id)">{{msg.involvedArticle.title}}</router-link></strong>”进行了评论-->
                “<strong>{{msg.sourceUser.nickname}}</strong>”对你的文章“<strong><router-link :to="{ name: 'articleIndex', params: { id: msg.involvedArticle.id }}"  @click.native="updateit(msg.id)">{{msg.involvedArticle.title}}</router-link></strong>”进行了评论“<strong>{{msg.content | stringslice}}</strong>”
              </q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile >{{formatDate(msg.createdate)}}</q-item-tile>
              <!--<q-item-tile icon="reply"/>-->
            </q-item-side>
          </q-item>
          <q-item-separator inset />
        </q-list>
      </div>
    </q-layout>
  </q-page>
</template>

<script>
import * as msgService from '@/services/msg'
import {date} from 'quasar'
import Router from '@/router/index'

export default {
  name: 'list',
  data () {
    return {
      initUserID: '',
      msgs: [],
      select: '0',
      options: [
        {
          label: '已读',
          value: '1'
        },
        {
          label: '未读',
          value: '0'
        }
      ]
    }
  },
  created () {
    this.getMsgByUserID()
  },
  filters: {
    stringslice: function (string) {
      if (!string) return ''
      if (string.length > 15) {
        return string.slice(0, 15) + '...'
      }
      return string
    }
  },
  methods: {
    formatDate (timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    },
    sendMSSG () {
      msgService.test()
    },
    getMsgByUserID (rua) {
      var _this = this
      if (rua === undefined) {
        rua = ''
      }
      msgService.getMsgByUserID(rua).then(Odin => {
        _this.msgs = Odin.loki
      }).catch(res => {
        Router.push({name: 'login'})
      })
      return ''
    },
    updateit (msgid) {
      msgService.readit(msgid)
    },
    readSwitch (rua) {
      this.getMsgByUserID(rua)
    }
  }
}
</script>

<style scoped>

</style>
