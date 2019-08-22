import request from '@/utils/request'
export function login (user) {
  // return request({
  //   url: '/login',
  //   method: 'post',
  //   // headers: {
  //   //   'Content-Type': 'application/json'
  //   // },
  //   contentType: 'application/json;charset=UTF-8',
  //   headers: {'Content-Type': 'application/json'},
  //   // emulator: true,
  //   // params: qs.stringify(user),
  //   params: user,
  //   transformRequest: [function (data) {
  //     return qs.stringify(data)
  //   }]
  // })
  // 都可以  对应  ModelAttribute  User user
  // return request({
  //   url: '/login',
  //   method: 'post',
  //   // contentType: 'application/json;charset=UTF-8',
  //   // emulator: true,`
  //   // params: qs.stringify(user),
  //   params: user
  // })
  // get upmg params
  // 都用requesbody  post yong data
  return request({
    url: '/login',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    headers: {'Content-Type': 'application/json'},
    timeout: 60000,
    data: JSON.stringify(user)
  })
}
export function register (user) {
  return request({
    url: '/register',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    headers: {'Content-Type': 'application/json'},
    timeout: 60000,
    data: JSON.stringify(user)
  })
}
export function dualCheck (u) {
  return request({
    url: '/user/dualCheck/' + u,
    method: 'get'
  })
}
