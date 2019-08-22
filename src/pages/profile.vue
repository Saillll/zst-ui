<template>
  <q-layout>
    <div class="row no-wrap">
      <div class="col-2 " ></div>
      <div class="col-8 ">
        <div class="column" >
          <q-infinite-scroll :handler="loadMore">
            <ul v-for="(user, index) in users" :key="index" >
              <a href="#">
                <q-card >
                  <q-card-title>
                    <p>{{user.username}} </p>
                    <span slot="subtitle" @click="toDetail">创建时间</span>
                  </q-card-title>
                  <q-card-separator />
                  <q-card-main>
                    <p>{{user.password}}</p>
                  </q-card-main>
                </q-card>
              </a>
            </ul>
            <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
          </q-infinite-scroll>
        </div>
      </div>
      <div class="col-2 "></div>
    </div>
  </q-layout>
</template>

<script>
import { queryAll } from '@/services/user'
export default {
  name: 'profile',
  data () {
    return {
      users: null
    }
  },
  created () {
    this.fillall()
  },
  methods: {
    fillall () {
      queryAll().then((result) => {
        this.users = result
      })
    },
    loadMore () {
      this.$q.notify({
        type: 'info',
        message: 'asdadfaf',
        position: 'bottom' // 'top', 'left', 'bottom-left'等
      }
      )
    },
    toDetail () {
      this.$q.notify({
        type: 'info',
        message: 'toDetail',
        position: 'bottom' // 'top', 'left', 'bottom-left'等
      }
      )
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
