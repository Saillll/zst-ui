
// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/Header.vue'),
//     children: [
//       { path: '', name: 'main', component: () => import('pages/mainview.vue') },
//       { path: 'user', name: 'user', component: () => import('pages/user.vue') },
//       { path: 'profile', name: 'profile', component: () => import('pages/profile.vue') },
//       { path: 'article', name: 'profile', component: () => import('pages/profile.vue') }
//     ]
//   }
// ]

// Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   })
// }
const page404 = {
  path: '*',
  name: '404',
  component: () => import('pages/Error404')
}
const loginRouter = {
  path: '/login',
  name: 'login',
  component: () => import('pages/login')
}
const registerRouter = {
  path: '/register',
  name: 'register',
  component: () => import('pages/register')
}

// const indexRouter = {
//   path: '/',
//   component: () => import('layouts/Header.vue'),
//   children: [
//     { path: '', name: 'main', component: () => import('pages/mainview.vue') },
//     // { path: 'home', name: 'home', component: () => import('pages/home.vue') },
//     { path: 'user', name: 'user', component: () => import('pages/user.vue') },
//     { path: 'profile', name: 'profile', component: () => import('pages/profile.vue') }
//     // { path: 'article', name: 'article', component: () => import('pages/profile.vue') }
//   ]
// }
const indexRouter = {
  path: '/',
  component: () => import('pages/mainview')
}
const homeRouter = {
  path: '/home',
  name: 'home',
  component: () => import('pages/home'),
  redirect: '/home/blog',
  // redirect: {name: 'blog'},
  children: [
    {
      path: 'blog',
      name: 'blog',
      component: () => import('pages/article/list.vue')
    },
    {
      path: 'blog/form/:id',
      name: 'formBlog',
      component: () => import('pages/article/form.vue')
    },
    {
      path: 'selfsettings',
      name: 'selfsettings',
      component: () => import('pages/selfsettings/index.vue')
    },
    {
      path: 'privatemsg',
      name: 'privatemsg',
      component: () => import('pages/privatemsg/list.vue')
    },
    {
      path: 'favorites',
      name: 'favorites',
      component: () => import('pages/favorites/list.vue')
    }
  ]
}

// 作为layout组件的子页面展示并且在左侧菜单显示的路由写在appRouter里(children至少包含一个子路由)
// const homeRouter = {
//   path: '/',
//   component: () => import('layouts/Header'),
//   children: [
//     {
//       path: '',
//       component: () => import('pages/home.vue'),
//       children: [
//         {
//           path: '/home',
//           name: 'home',
//           component: () => import('pages/article/list.vue'),
//           children: [
//             {
//               path: 'blog',
//               name: 'blog',
//               component: () => import('pages/article/list.vue')
//             },
//             {
//               path: 'selfsettings',
//               name: 'selfsettings',
//               component: () => import('pages/selfsettings/index.vue')
//             },
//             {
//               path: 'privatemsg',
//               name: 'privatemsg',
//               component: () => import('pages/privatemsg/list.vue')
//             },
//             {
//               path: 'favorites',
//               // name: 'favorites',
//               component: () => import('pages/favorites/list.vue')
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }

const articleRoute = {
  path: '/article',
  name: 'article',
  component: () => import('layouts/Header.vue'),
  children: [
    { path: ':id', name: 'articleIndex', component: () => import('pages/article/index.vue') }
  ]
}
// export default routes
export const routes = [
  loginRouter,
  registerRouter,
  indexRouter,
  homeRouter,
  articleRoute,
  page404
]
