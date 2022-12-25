import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const BASE_URL =  'http://localhost:18082/api'
export function getBaseUrl() {
  return BASE_URL
}

// 设置请求的地址
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})

// 构造请求
service.interceptors.request.use(
  config => {
    // 传递token，除了登录的时候没有token以外都要传
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // 错误
    return Promise.reject(error)
  }
)

// 发完请求以后的响应结果
service.interceptors.response.use(

  response => {
    // 后期需要返回的数据，先放着
    const res = response.data
    // 我的要求：200代表成功
    if (res.code !== 200) {
      // 设置错误信息
      var out_msg = (res.code + ' - ' + res.msg) || (res.code + ' - ' + '错误！')
      Message({
        message: out_msg,
        showClose: true,
        type: 'error',
        duration: 5 * 1000
      })
      // 是否需要重新设置token
      if (res.code === 50000) {
        // 跳转到resetToken
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(out_msg))
    } else {
      // Message({
      //   message: res.msg || '成功！',
      //   showClose: true,
      //   type: 'success',
      //   duration: 5 * 1000
      // })
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      showClose: true,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
// export default BASE_URL

