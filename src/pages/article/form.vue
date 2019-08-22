<template>
  <q-layout>
  <div>
    <q-input type="text"  v-model="article.title" float-label="标题" placeholder="请输入标题" />
    <!--<q-input type="textarea" v-model="article.content" float-label="内容"  placeholder="请输入内容" rows="15"/>-->

    <editor id='tinymce' v-model='article.content' :init='init'></editor>
    <!--<div v-html='tinymceHtml'></div>-->
    <q-btn push class="bg-grey-5 text-white" @click="saveArticle">保存</q-btn>
  </div>
  </q-layout>
</template>
<script>
// import * as articleService from '@/services/article'
import * as articleService from '@/services/article'
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import { uploadImage } from '@/services/files'
import Router from '../../router'
import { Notify } from 'quasar'
export default {
  name: 'formBlog',
  components: {Editor},
  mounted () {
    tinymce.init({})
  },
  data () {
    return {
      id: '',
      article: {
        id: '',
        title: '',
        content: ''
      },
      tinymceHtml: '请输入内容',
      init: {
        language_url: '/statics/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/statics/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu ',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false,
        images_upload_handler (blobInfo, success, failure) {
          let imageData = new FormData()
          imageData.set('imageData', blobInfo.blob())
          uploadImage(imageData).then(Odin => {
            let imageURL = ''
            if (Odin.hela.code === 0) {
              imageURL = Odin.loki
            }
            success(imageURL)
          }).catch(res => {
            failure(res)
            console.info(res)
          })
        }
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    this.initArticle()
  },
  methods: {
    initArticle () {
      const _this = this
      articleService.formOne(this.$route.params.id).then((Odin) => {
        let at = Odin.loki
        if (at !== '' && at !== null) {
          _this.article.id = at.id
          _this.article.title = at.title
          _this.article.content = at.content
        }
      })
    },
    saveArticle () {
      let article = this.article
      articleService.save(article).then((Odin) => {
        Router.push({name: 'home'})
        Notify.create({
          message: '保存成功',
          position: 'bottom'
        })
      }).catch(res => {
        Notify.create({
          message: '保存失败',
          position: 'bottom'
        })
      })
    },
    handleImgUpload (blobInfo, success, failure) {
      let imageData = new FormData()
      imageData.set('imageData', blobInfo.blob())
      uploadImage(imageData).then(res => {
      }).catch(res => {
      })
    }
  }
}
</script>

<style scoped>

</style>
