// Configuration for your app
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}
const workConfig = require('./src/config/env.work')
const homeConfig = require('./src/config/env.home')
const goConfig = require('./src/config/env.go')
function getURLServer (urlServer) {
  // 1是home 2是work 不知道为什么 使用字母的时候无法正确的判断相等，并且不能使用===强等号
  const goType = urlServer
  let defaultURL = 'http://localhost:8066'
  // eslint-disable-next-line eqeqeq
  if (goType == 1) {
    console.info('URL_SERVER==' + homeConfig.URL_SERVER)
    return homeConfig.URL_SERVER
  }
  // eslint-disable-next-line eqeqeq
  if (goType == 2) {
    console.info('URL_SERVER==' + workConfig.URL_SERVER)
    return workConfig.URL_SERVER
  }
  // eslint-disable-next-line eqeqeq
  if (goType == 9) {
    console.info('URL_SERVER==' + goConfig.URL_SERVER)
    return goConfig.URL_SERVER
  }
  defaultURL = JSON.stringify(defaultURL)
  return defaultURL
}
module.exports = function (ctx) {
  var p = {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'vuelidate'
    ],
    css: [
      'app.styl'
    ],
    // babel: {
    //   presets: ['es2015']
    // },
    //
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      env: ctx.dev
        ? { // so on dev we'll have
          API: getURLServer(process.env.URL_SERVER)
          // API: JSON.stringify('http://locahost:8066')
        }
        : { // and on build (production):
          API: getURLServer(process.env.URL_SERVER)
        },
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          // Add you own alias like this
          '@': resolve('src')
        }
      }
    },
    devServer: {
      https: false,
      port: 18006,
      // proxy: {
      //   '/': {
      //     target: 'http://localhost:8066' // 接口的域名
      //     // secure: false,  // 如果是https接口，需要配置这个参数
      //     // changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //     // pathRewrite: {
      //     //   '^/api': ''
      //     // }
      //   },
      //   // 将所有以/api开头的请求代理到jsonplaceholder
      //   '/api': {
      //     target: 'http://some.api.target.com:7070',
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/api': ''
      //     }
      //   }
      // },
      open: true // opens browser window automatically
    },
    // dev: {
    //   assetsSubDirectory: 'static',
    //   assetsPublicPath: '/',
    //   proxyTable: {
    //     '/': {
    //       target: 'http://localhost:8066', // 接口的域名
    //       // secure: false,  // 如果是https接口，需要配置这个参数
    //       changeOrigin: true // 如果接口跨域，需要进行这个参数配置
    //       // pathRewrite: {
    //       //   '^/api': ''
    //       // }
    //     }
    //   }
    // },
    framework: 'all', // --- includes everything; for dev only!
    // framework: {
    //   components: [
    //     'QLayout',
    //     'QLayoutHeader',
    //     'QLayoutDrawer',
    //     'QPageContainer',
    //     'QPage',
    //     'QToolbar',
    //     'QToolbarTitle',
    //     'QBtn',
    //     'QIcon',
    //     'QList',
    //     'QListHeader',
    //     'QItem',
    //     'QItemMain',
    //     'QItemSide'
    //   ],
    //   directives: [
    //     'Ripple'
    //   ],
    //   // Quasar plugins
    //   plugins: [
    //     'Notify'
    //   ]
    //   // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
    //   // i18n: 'de' // Quasar language
    // },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
  return p
}
