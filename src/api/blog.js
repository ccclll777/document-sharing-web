import request from '@/utils/request'

// 获取最近的文章列表
export function getRecentArticles(page, size) {
  return request({
    url: '/article/list',
    method: 'get',
    params: { page: page, size: size }
  })
}

// 获取某篇文章内容
export function getArticle(id) {
  return request({
    url: '/article/' + id,
    method: 'get'
  })
}

// 按照用户浏览历史分类
export function getArticlesByHisCategory() {
  return request({
    url: '/article/recommendArticleByCategory',
    method: 'get'
  })
}

// 按照用户浏览历史标签
export function getArticlesByHisTag() {
  return request({
    url: '/article/recommendArticleByTag',
    method: 'get'
  })
}

// 按照新鲜度和流行度获取文章列表
export function getArticlesByFreshPopular(page, size) {
  return request({
    url: '/article/recommendArticleByFreshPopular',
    method: 'get',
    params: { page: page, size: size }
  })
}

// 获取相似文章列表
export function getSimilarityArticle(id) {
  return request({
    url: '/article/recommendSimilarityArticle',
    method: 'get',
    params: { articleId: id }
  })
}

// 根据标签获取
export function getArticleListByTag(id, page, size) {
  return request({
    url: '/article/articleListByTag',
    method: 'get',
    params: { tagId: id, page: page, size: size }
  })
}

// 获取最高点赞的列表
export function getArticleListByLikeCount(page, size) {
  return request({
    url: '/article/articleListByLikeCount',
    method: 'get',
    params: { page: page, size: size }
  })
}

// 增加阅读数
export function readArticle(id) {
  return request({
    url: '/record/browerHistory',
    method: 'get',
    params: { articleId: id }
  })
}

// 增加点赞数
export function likeArticle(id) {
  return request({
    url: '/record/addLikeArticle',
    method: 'get',
    params: { articleId: id }
  })
}



// 获取博主列表
export function getBloggerList(page, size) {
  return request({
    url: '/blog/list',
    method: 'get',
    params: { page: page, size: size }
  })
}

// 根据博主id返回博客列表
export function getArticleListByBlogger(id, page, size) {
  return request({
    url: '/article/getArticleListByBlogId',
    method: 'get',
    params: { blogId: id, page: page, size: size }
  })
}

// 搜索
export function searchArticleList(word) {
  return request({
    url: '/es/query',
    method: 'get',
    params: { key: word }
  })
}

// 搜索补全
export function searchAutoComplete(word) {
  return request({
    url: '/es/hint',
    method: 'get',
    params: { key: word }
  })
}

// 获取订阅推荐列表
export function getArticleListBySubscription() {
  return request({
    url: '/article/getArticleListBySubscription',
    method: 'get'
  })
}

// 获取订阅列表
export function getSubscriptionList() {
  return request({
    url: '/subscription/list',
    method: 'get'
  })
}

// 获取订阅状态
export function getSubscriptionStatus(type, subscriptionId) {
  return request({
    url: '/subscription/status/' + type + '/' + subscriptionId,
    method: 'get'
  })
}

// 添加订阅
export function addSubscription(type, subscriptionId) {
  return request({
    url: '/subscription/add',
    method: 'get',
    params: { type: type, subscriptionId: subscriptionId }
  })
}

// 删除订阅
export function delSubscription(type, subscriptionId) {
  return request({
    url: '/subscription/' + type + '/' + subscriptionId,
    method: 'delete'
  })
}
