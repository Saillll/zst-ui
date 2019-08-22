import request from '@/utils/request'
export function getAllCommentsByArticleID (articleID) {
  return request({
    url: '/articlecomment/getAllComments/' + articleID,
    method: 'get'
  })
}

export function save (articlecomment) {
  return request({
    url: '/articlecomment/save/',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    headers: {'Content-Type': 'application/json'},
    timeout: 60000,
    data: JSON.stringify(articlecomment)

  })
}

export function getCommentByID (id) {
  // noinspection JSAnnotator
  return request({
    url: '/articlecomment/getComment/' + id,
    // contentType: 'application/x-www-form-urlencoded;charset=UTF-8', 默认是application/json，在axios的default.js中
    // contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    // headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    // headers: {'Content-Type': 'multipart/form-data'},
    // params: {'id': id},
    // headers: {
    //   common: {
    //     'Accept': 'application/x-www-form-urlencoded, text/plain, */*'
    //   }
    // },
    method: 'GET'
  })
}
