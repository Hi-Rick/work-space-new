import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import treeTableRouter from './modules/tree-table'
import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // {
  //   path: '/home',
  //   component: () => import('@/views/HomePage/home'),
  //   hidden: true
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/DraftPage',
    component: () => import('@/views/officePro/DraftPage'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/work-space/HomePage/index'),
        name: 'Dashboard',
        meta: { title: 'GIS信息', icon: 'international' , noCache: true }
      }
    ]
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  // {
  //   path: '/meetingManage',
  //   component: Layout,
  //   name: 'meetingManage',
  //   redirect: '/RoomReserve',
  //   meta: {
  //     title: '会议管理',
  //     icon: 'peoples',
  //     roles: ['水资源综合管理中心负责人']
  //   },
  //   children: [
  //     {
  //       path: '/RoomReserve',
  //       component: () => import('@/views/officeManage/meetingManage/RoomReserve'),
  //       name: 'RoomReserve',
  //       meta: { title: '会议室预定', affix: false, roles: ['水资源综合管理中心负责人'] }
  //     },
  //     {
  //       path: '/MyReserve',
  //       component: () => import('@/views/officeManage/meetingManage/MyReserve'),
  //       name: 'MyReserve',
  //       meta: { title: '我的预定', affix: false, roles: ['水资源综合管理中心负责人'] }
  //     },
  //     {
  //       path: '/MyMeeting',
  //       component: () => import('@/views/officeManage/meetingManage/MyMeeting'),
  //       name: 'MyMeeting',
  //       meta: { title: '我的会议', affix: false, roles: ['水资源综合管理中心负责人'] }
  //     }
  //   ]
  // },
  // {
  //   path: '/AnnouncementShow',
  //   component: Layout,
  //   name: 'notification',
  //   redirect: '/AnnouncementShow',
  //   meta: {
  //     title: '通知公告',
  //     icon: 'tongzhi',
  //     roles: ['重点水库管护中心负责人']
  //   },
  //   children: [
  //     {
  //       path: '/AnnouncementShow',
  //       component: () => import('@/views/subsidiaryOffice/notification/AnnouncementShow'),
  //       name: 'AnnouncementShow',
  //       meta: { title: '公告展示', affix: false, roles: ['重点水库管护中心负责人'] }
  //     }
  //   ]
  // },
  // {
  //   path: '/AddressBook',
  //   component: Layout,
  //   name: 'addressBook',
  //   redirect: '/AddressBook',
  //   meta: {
  //     title: '通讯录',
  //     icon: 'addressBook',
  //     roles: ['重点水库管护中心负责人']
  //   },
  //   children: [
  //     {
  //       path: '/AddressBook',
  //       component: () => import('@/views/subsidiaryOffice/addressBook/AddressBook'),
  //       name: 'AddressBook',
  //       meta: { title: '通讯录', affix: false,roles: ['重点水库管护中心负责人'] }
  //     },
  //     {
  //       path: '/MyAddressBook',
  //       component: () => import('@/views/subsidiaryOffice/addressBook/MyAddressBook'),
  //       name: 'MyAddressBook',
  //       meta: { title: '个人通讯录', affix: false,roles: ['重点水库管护中心负责人'] }
  //     }
  //   ]
  // },
  // {
  //   path: '/ShareFile',
  //   component: Layout,
  //   name: 'docManage',
  //   redirect: '/ShareFile',
  //   meta: {
  //     title: '文档管理',
  //     icon: 'doc-one',
  //     roles: ['重点水库管护中心负责人']
  //   },
  //   children: [
  //     {
  //       path: '/ShareFile',
  //       component: () => import('@/views/subsidiaryOffice/docManage/ShareFile'),
  //       name: 'ShareFile',
  //       meta: { title: '共享文件', affix: false, roles: ['重点水库管护中心负责人'] }
  //     },
  //     {
  //       path: '/MyFile',
  //       component: () => import('@/views/subsidiaryOffice/docManage/MyFile'),
  //       name: 'MyFile',
  //       meta: { title: '个人文件', affix: false, roles: ['重点水库管护中心负责人'] }
  //     }
  //   ]
  // },
  // {
  //   path: '/MyInfo',
  //   component: Layout,
  //   name: 'mySet',
  //   redirect: '/MyInfo',
  //   meta: {
  //     title: '个人设置',
  //     icon: 'user',
  //     roles: ['重点水库管护中心负责人']
  //   },
  //   children: [
  //     {
  //       path: '/MyInfo',
  //       component: () => import('@/views/systemManage/MySet/MyInfo'),
  //       name: 'MyInfo',
  //       meta: { title: '个人资料', affix: false, roles: ['重点水库管护中心负责人'] }
  //     },
  //     {
  //       path: '/MyPassword',
  //       component: () => import('@/views/systemManage/MySet/MyPassword'),
  //       name: 'MyPassword',
  //       meta: { title: '平台密码', affix: false, roles: ['重点水库管护中心负责人'] }
  //     },
  //   ]
  // },
  {
    path: '/WaterStatus',
    component: Layout,
    children: [
      {
        path: 'WaterResource',
        name: 'WaterStatus',
        component: () => import('@/views/work-space/watersource/WaterResource'),
        meta: { title: '取水许可证', icon: 'password', roles: ['水资源综合管理中心负责人'],noCache: true }
      },
    ]
  },
  {
    path: '/WaterInspection',
    component: Layout,
    children: [
      {
        path: 'waterInspection',
        name: 'WaterInspection',
        component: () => import('@/views/work-space/watersource/waterInspection'),
        meta: { title: '水资源事件处理', icon: 'search', roles: ['水资源综合管理中心负责人'],noCache: true }
      },
    ]
  },{
    path: '/qualitymanage',
    component: Layout,
    children: [
      {
        path: 'QualityManage',
        name: 'qualitymanage',
        component: () => import('@/views/work-space/QualityManage'),
        meta: { title: '水质管理', icon: 'example', roles: ['水资源综合管理中心负责人'],noCache: true }
      },
    ]
  },
  {
    path: '/countrystd',
    component: Layout,
    children: [
      {
        path: 'CountryStd',
        name: 'countrystd',
        component: () => import('@/views/work-space/CountryStd'),
        meta: { title: '国家水质标准', icon: 'icon', roles: ['水资源综合管理中心负责人'],noCache: true }
      },
    ]
  },
  {
    path: '/ProjectInspection',
    component: Layout,
    children: [
      {
        path: 'projectInspection',
        name: 'ProjectInspection',
        component: () => import('@/views/work-space/processManage/projectInspection'),
        meta: { title: '工程事件处理', icon: 'search', roles: ['工程管理科负责人'],noCache: true}
      }
    ]
  },
  {
    path: '/ProInfo',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ProInfo',
        component: () => import('@/views/work-space/processManage/index'),
        meta: { title: '立项阶段', icon: 'edit', roles: ['工程管理科负责人'],noCache: true }
      }
    ]
  },
  {
    path: '/Bidding',
    component: Layout,
    children: [
      {
        path: 'bidding',
        name: 'Bidding',
        component: () => import('@/views/work-space/processManage/bidding'),
        meta: { title: '招标阶段', icon: 'guide', roles: ['工程管理科负责人'],noCache: true }
      }
    ]
  },
  {
    path: '/Work',
    component: Layout,
    children: [
      {
        path: 'work',
        name: 'Work',
        component: () => import('@/views/work-space/processManage/work'),
        meta: { title: '施工阶段', icon: 'table', roles: ['工程管理科负责人'],noCache: true }
      }
    ]
  },
  {
    path: '/Begin',
    component: Layout,
    children: [
      {
        path: 'begin',
        name: 'Begin',
        component: () => import('@/views/work-space/processManage/begin'),
        meta: { title: '验收阶段', icon: 'eye-open', roles: ['工程管理科负责人'],noCache: true  }
      }
    ]
  },
  {
    path: '/organizationalstructure',
    component: Layout,
    children: [
      {
        path: 'reservoirInspection',
        name: 'ReservoirInspection',
        component: () => import('@/views/work-space/reservoirManage/reservoirInspection'),
        meta: { title: '水库事件处理', icon: 'search' , roles: ['重点水库管护中心负责人'], noCache: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
