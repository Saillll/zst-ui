import request from '@/utils/request'
export function queryAll (index) {
  return request({
    url: '/article/all/' + index,
    method: 'get'
  })
}
export function queryAllLimit (index) {
  return request({
    url: '/article/allLimit/' + index,
    method: 'get'
  })
}
export function getOne (id) {
  return request({
    url: '/article/get/' + id,
    method: 'get'
  })
}

export function deleteOne (id) {
  return request({
    url: '/article/delete/' + id,
    method: 'delete'
  })
}

export function formOne (id) {
  return request({
    url: '/article/form/' + id,
    method: 'get'
  })
}

export function save (article) {
  return request({
    url: '/article/save/',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    headers: {'Content-Type': 'application/json'},
    timeout: 60000,
    data: JSON.stringify(article)

  })
}
export function readOne (id) {
  return request({
    url: '/article/readOne/' + id,
    method: 'get'
  })
}
