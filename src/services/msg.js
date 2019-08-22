import request from '@/utils/request'
export function test () {
  return request({
    url: '/msg/test',
    method: 'get'
  })
}
export function getMsgByUserID (rua) {
  return request({
    url: '/msg/getMsgByUserID',
    method: 'get',
    params: {'rua': rua}
  })
}
export function readit (msgid) {
  return request({
    url: '/msg/readit/' + msgid,
    method: 'get'
  })
}
export function saveIt (msg) {
  return request({
    url: '/msg/saveit/',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    headers: {'Content-Type': 'application/json'},
    timeout: 60000,
    data: JSON.stringify(msg)
  })
}
