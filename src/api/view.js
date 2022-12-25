import request from '@/utils/request'

// 获取活动数据
export function getUserStatistic() {
  return request({
    url: '/portrait/statistics',
    method: 'get',
    params: { day: 14 }
  })
}

// 获取用户最喜欢的标签
export function getUserStatisticTag() {
  return request({
    url: '/portrait/tags',
    method: 'get',
    params: { size: 20 }
  })
}

// 获取用户最喜欢的博主
export function getUserStatisticBlog() {
  return request({
    url: '/portrait/blogs',
    method: 'get',
    params: { size: 5 }
  })
}

// 获取用户最喜欢的文章
export function getUserStatisticArticle() {
  return request({
    url: '/portrait/articles',
    method: 'get',
    params: { size: 5 }
  })
}
