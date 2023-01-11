import request from '@/utils/request'

export function adminGetUserCount() {
  return request({
    url: '/admin/user/count',
    method: 'get'
  })
}

export function adminGetUserLists(page, size) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params: { page: page, size: size }
  })
}

export function adminUpdateUserInfo(id, data) {
  return request({
    url: '/admin/user/' + id,
    method: 'post',
    data
  })
}

export function adminDelUser(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}



export function adminUpdateBlog(id, data) {
  return request({
    url: '/admin/blog/' + id,
    method: 'post',
    data
  })
}


export function adminGetArticleCount() {
  return request({
    url: '/admin/article/count',
    method: 'get'
  })
}

export function adminGetArticleList(page, size) {
  return request({
    url: '/article/list',
    method: 'get',
    params: { page: page, size: size }
  })
}

export function adminUpdateArticle(id, data) {
  return request({
    url: '/admin/article/' + id,
    method: 'post',
    data
  })
}

export function adminDelArticle(id) {
  return request({
    url: '/admin/article/' + id,
    method: 'delete'
  })
}
