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

export function adminGetTagCount() {
  return request({
    url: '/admin/tag/count',
    method: 'get'
  })
}

export function adminGetTagList(page, size) {
  return request({
    url: '/admin/tag/list',
    method: 'get',
    params: { page: page, size: size }
  })
}

export function adminUpdateTag(id, data) {
  return request({
    url: '/admin/tag/' + id,
    method: 'post',
    data
  })
}

export function adminDelTag(id) {
  return request({
    url: '/admin/tag/' + id,
    method: 'delete'
  })
}

export function adminGetBlogCount() {
  return request({
    url: '/admin/blog/count',
    method: 'get'
  })
}

export function adminGetBlogList(page, size) {
  return request({
    url: '/admin/blog/list',
    method: 'get',
    params: { page: page, size: size }
  })
}

export function adminUpdateBlog(id, data) {
  return request({
    url: '/admin/blog/' + id,
    method: 'post',
    data
  })
}

export function adminDelBlog(id) {
  return request({
    url: '/admin/blog/' + id,
    method: 'delete'
  })
}

export function adminAddBlog(data) {
  return request({
    url: '/admin/blog/add',
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

export function adminGetCrawlList(page, size) {
  return request({
    url: '/admin/crawl/task/list',
    method: 'get',
    params: { page: page, size: size}
  })
}

export function adminGetCrawlCount() {
  return request({
    url: '/admin/crawl/task/count',
    method: 'get'
  })
}

export function adminGetCrawlHisList(page, size) {
  return request({
    url: '/admin/crawl/history/list',
    method: 'get',
    params: { page: page, size: size}
  })
}

export function adminGetCrawlHisCount() {
  return request({
    url: '/admin/crawl/history/count',
    method: 'get'
  })
}

export function adminAddCrawl(id) {
  return request({
    url: '/admin/crawl/task/add/' + id,
    method: 'get'
  })
}
