import request from '@/utils/request'

// 获取最近的文章点赞量排名
export function getArticleLikingCountRecently() {
  return request({
    url: '/admin/record/getArticleLikingCountRecently',
    method: 'get',
    params: { day: 7, page: 1, size: 5 }
  })
}

// 获取最近的文章浏览排名
export function getArticleBrowsingCountRecently() {
  return request({
    url: '/admin/record/getArticleBrowsingCountRecently',
    method: 'get',
    params: { day: 7, page: 1, size: 5 }
  })
}

// 获取最近的标签热度数据
export function getTagBrowsingCountRecently() {
  return request({
    url: '/admin/record/getTagBrowsingCountRecently',
    method: 'get',
    params: { day: 7, page: 1, size: 30 }
  })
}

// 获取给文章点赞用户数据
export function getUserLikingCountRecently() {
  return request({
    url: '/admin/record/getUserLikingCountRecently',
    method: 'get',
    params: { day: 7, page: 1, size: 5 }
  })
}

// 获取文章浏览用户数据
export function getUserBrowsingCountRecently() {
  return request({
    url: '/admin/record/getUserBrowsingCountRecently',
    method: 'get',
    params: { day: 7, page: 1, size: 5 }
  })
}

// 获取最热门博主数据
export function getBlogArticleBrowsingCountRecently() {
  return request({
    url: '/admin/record/getBlogArticleBrowsingCountRecently',
    method: 'get',
    params: { day: 7, page: 1, size: 5 }
  })
}

// 最近几天发布的文章数量
export function getArticleRecently() {
  return request({
    url: '/admin/article/getArticleRecently',
    method: 'get',
    params: { day: 30 }
  })
}

// 最近几天每个博客发布的文章数量
export function getBlogArticleRecently() {
  return request({
    url: '/admin/article/getBlogArticleRecently',
    method: 'get',
    params: { day: 30 }
  })
}

// 性别统计
export function getSexStatistic() {
  return request({
    url: '/admin/user/statistics/sex',
    method: 'get'
  })
}
