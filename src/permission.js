import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = ['/login', '/home']
// 只有管理员才有权限访问的页面
const adminList = /^\/admin/

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  // 获取用户token
  const hasToken = getToken()
  if (hasToken) {
    // 有token的处理情况
    if (to.path === '/login') {
      // 不能重复登录
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断用户权限
      const userRole = store.getters.role
      if (userRole === 2) {
        // 普通用户
        if (to.path.match(adminList) === null) {
          // 普通用户访问普通页面
          next()
        } else {
          // 没有权限访问管理员可以访问的页面
          next(`/404?redirect=${to.path}`)
        }
      } else if (userRole === 1 || userRole === 3) {
        // 管理员可以访问所有页面
        next()
      } else {
        // 获取用户权限
        try {
          await store.dispatch('user/getInfo')
          // 判断用户权限
          const userRole = store.getters.role
          if (userRole === 2) {
            // 普通用户
            if (to.path.match(adminList) === null) {
              // 普通用户访问普通页面
              next()
            } else {
              // 没有权限访问管理员可以访问的页面
              next(`/404?redirect=${to.path}`)
            }
          } else if (userRole === 1 || userRole === 3) {
            // 管理员可以访问所有页面
            next()
          }
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token 跳转登录或者白名单
    if (whiteList.indexOf(to.path) !== -1 || to.path.match(/^\/detail\/blog/) !== null) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
