import { createRouter, createWebHistory } from 'vue-router'
import welcomePage from '../views/welcome_page.vue'

// 定義路由的 meta 類型
interface RouteMeta {
  title?: string
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome Page',
      component: welcomePage,
      meta: {
        title: 'Welcome Page' as string,
      },
    },
    // 可以添加其他路由
  ],
})

// 全域導航守衛
router.beforeEach(to => {
  // 如果路由有 meta.title，則更新 document.title
  const title = (to.meta as RouteMeta).title // 轉型為 RouteMeta
  document.title = title || 'Default Title' // 若 title 為 undefined，則使用預設標題
})

export default router
