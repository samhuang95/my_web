import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    label?: string
  }
}

export enum RouteName {
  WELCOME = 'welcome',
  SHOWCASE = 'showcase',
  LOGIN = 'login',
  Blog = 'blog',
  MANAGEMENT = 'management',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.WELCOME,
    component: () => import('../views/welcome_page.vue'),
  },
  {
    path: '/showcase',
    name: RouteName.SHOWCASE,
    component: () => import('../views/showcase_page.vue'),
  },
  {
    path: '/login',
    name: RouteName.LOGIN,
    component: () => import('../views/login_page.vue'),
  },
  {
    path: '/blog',
    name: RouteName.Blog,
    component: () => import('../views/blog_page.vue'),
  },
  {
    path: '/login',
    name: RouteName.LOGIN,
    component: () => import('../views/login_page.vue'),
  },
  {
    path: '/management',
    name: RouteName.MANAGEMENT,
    component: () => import('../views/management_page.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

// 建立 router 實例
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
