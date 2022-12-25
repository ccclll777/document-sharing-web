import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(userId) {
  console.log("userId",userId)
  return request({
    url: '/auth/info',
    method: 'get',
    params: { userId: userId }
  })
}

export function register(data) {
  return request({
    url: '/user/regist',
    method: 'post',
    data
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}

// 获取用户历史记录
export function getUserHistoryList(page, size) {
  return request({
    url: '/record/getBrowsingHistory',
    method: 'get',
    params: { page: page, size: size }
  })
}

export function getDetailInfo() {
  return request({
    url: '/auth/info',
    method: 'get'
  })
}

export function getRecord() {
  return request({
    url: '/record/count',
    method: 'get'
  })
}

export function addUserBlog(data) {
  return request({
    url: '/blog/add',
    method: 'post',
    data
  })
}

export function updateUserBlog(data) {
  return request({
    url: '/blog/edit',
    method: 'post',
    data
  })
}

export function getUserBlog() {
  return request({
    url: '/blog/status',
    method: 'get'
  })
}

export function getUserBlogCount() {
  return request({
    url: '/blog/count',
    method: 'get'
  })
}

export function getArticleListByUserBlog(page, size) {
  return request({
    url: '/article/getArticleListByUserBlog',
    method: 'get',
    params: { page: page, size: size }
  })
}

export function getArticleChart(type) {
  return request({
    url: '/blog/statistics/' + type,
    method: 'get',
    params: { day: 13 }
  })
}

export function userAddCrawl(id) {
  return request({
    url: '/webhook/blog/crawl/' + id,
    method: 'get'
  })
}
