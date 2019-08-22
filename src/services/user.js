import request from '@/utils/request'
export function queryAll () {
  return request({
    url: '/getUser',
    method: 'get'
  })
}

export function getSelf () {
  return request({
    url: '/user/getSelf',
    method: 'get'
  })
}

export function save (user) {
  return request({
    url: '/user/save/',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    headers: {'Content-Type': 'application/json'},
    timeout: 60000,
    data: JSON.stringify(user)

  })
}
