import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import noSideBar from '@/layout/noSideBar/index'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: noSideBar,
    children: [{
      path: '',
      name: 'Login',
      component: () => import('@/views/login/index')
    }],
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },

  // {
  //   path: '/detail/blog/:id',
  //   component: Layout,
  //   children: [{
  //     path: '',
  //     name: 'BlogView',
  //     component: () => import('@/views/blogView/index'),
  //     meta: { title: '博客正文', icon: 'blog' },
  //     hidden: true
  //   }]
  // },
  // {
  //   path: '/detail/:type/:id',
  //   component: Layout,
  //   children: [{
  //     path: '',
  //     name: 'AuthorView',
  //     component: () => import('@/views/authorView/index'),
  //     meta: { title: '详细信息', icon: 'user' },
  //     hidden: true
  //   }]
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  {
    path: '/blog/trend',
    component: Layout,
    meta: { title: '文档收录', icon: 'blog' },
    children: [
      {
        path: '',
        component: () => import('@/views/addFile/index'),
        name: 'Blog1',
        meta: { title: '文档上传', icon: 'hot' }
      }
    ]
  },

  // {
  //   path: '/blog/recommend',
  //   component: Layout,
  //   meta: { title: '文档收录', icon: 'blog' },
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/blogRecommend/index'),
  //       name: 'Blog2',
  //       meta: { title: '个性推荐', icon: 'recommend' }
  //     }
  //   ]
  // },

  // {
  //   path: '/blog/tag',
  //   component: Layout,
  //   meta: { title: '文档收录', icon: 'blog' },
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/blogTag/index'),
  //       name: 'Blog3',
  //       meta: { title: '发现标签', icon: 'tag' }
  //     }
  //   ]
  // },

  // {
  //   path: '/blog/writer',
  //   component: Layout,
  //   meta: { title: '文档收录', icon: 'blog' },
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/blogWriter/index'),
  //       name: 'Blog4',
  //       meta: { title: '发现博主', icon: 'blog' }
  //     }
  //   ]
  // },

  {
    path: '/blog/search',
    component: Layout,
    meta: { title: '文档收录', icon: 'blog' },
    children: [
      {
        path: '',
        component: () => import('@/views/blogSearch/index'),
        name: 'Blog5',
        meta: { title: '文档搜索', icon: 'search' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    name: 'User',
    meta: { title: '用户服务', icon: 'user' },
    children: [
      {
        path: 'userDocs',
        component: () => import('@/views/userDocs/index'),
        name: 'userDocs',
        meta: { title: '我的文档', icon: 'writer' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    name: 'User',
    meta: { title: '用户服务', icon: 'user' },
    children: [
      {
        path: 'info',
        component: () => import('@/views/userInfo/index'),
        name: 'User1',
        meta: { title: '个人信息', icon: 'userif' }
      }
    ]
  },

  {
    path: '/admin',
    component: noSideBar,
    redirect: '/admin/dashboard',
    name: 'Admin',
    hidden: true,
    meta: { title: '后台管理', icon: 'manage' },
    children: [
      // {
      //   path: 'dashboard',
      //   component: () => import('@/views/Data/index'),
      //   name: 'Admin0',
      //   meta: { title: '数据总览', icon: 'data' }
      // },
      {
        path: 'category',
        component: () => import('@/views/admin/Category/index'),
        name: 'Admin1',
        meta: { title: '任务管理', icon: 'article' }
      },
      {
        path: 'user',
        component: () => import('@/views/admin/User/index'),
        name: 'Admin2',
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'tag',
        component: () => import('@/views/admin/Tag/index'),
        name: 'Admin3',
        meta: { title: '标签管理', icon: 'tag' }
      },
      {
        path: 'docs',
        component: () => import('@/views/admin/Docs/index'),
        name: 'Admin4',
        meta: { title: '文档管理', icon: 'docs' }
      },
      // {
      //   path: 'article',
      //   component: () => import('@/views/Article/index'),
      //   name: 'Admin5',
      //   meta: { title: '博文管理', icon: 'article' }
      // }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
