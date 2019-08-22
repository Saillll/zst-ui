import request from '@/utils/request'
export function getFreeFavorites (index, userid) {
  return request({
    url: '/favorites/getFreeFavorites',
    method: 'get',
    params: {'index': index, 'userid': userid}
  })
}
export function getAllLimit (index) {
  return request({
    url: '/favorites/allLimit/' + index,
    method: 'get'
  })
}

export function favor (articleid) {
  return request({
    url: '/favorites/favor/' + articleid,
    method: 'get'
  })
}
export function getLike (articleid) {
  return request({
    url: '/favorites/getLike/' + articleid,
    method: 'get'
  })
}
export function cancelFavor (id) {
  return request({
    url: '/favorites/cancelFavor/' + id,
    method: 'get'
  })
}
