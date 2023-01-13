import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(userId) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: { userId: userId }
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
export function getUserCount() {
  return request({
    url: '/user/count',
    method: 'get'
  })
}
export function getUserList(page, size) {
  return request({
    url: '/user/all',
    method: 'get',
    params: { pageNum: page, pageSize: size }
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}
export function deleteUser(userId) {
  return request({
    url: '/user/delete/' + userId,
    method: 'delete'
  })
}
export function updateUserRole(data) {
  return request({
    url: '/user/updateUserRole',
    method: 'post',
    data
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
