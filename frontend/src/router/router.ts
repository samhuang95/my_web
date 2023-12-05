import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    label?: string;
  }
}

export enum RouteName {
  HOME = 'home',

  HOME_FILTER = 'home-filter',
  RTF_EDITOR = 'rtf-editor',
  ARTICLE = 'the-article',
  ADMIN = 'the-admin',
}

export enum Role {
  SELLER = 'seller',
  BUYER = 'buyer',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: RouteName.HOME,
    },
  },

  {
    path: '/home',
    name: RouteName.HOME,
    component: () => import('../views/the-home.vue'),
  },

  {
    path: '/home/:articleTag',
    name: RouteName.HOME_FILTER,

    component: () => import('../views/the-home.vue'),
  },

  {
    path: `/rtf-editor`,
    name: RouteName.RTF_EDITOR,
    component: () => import('../views/the-article-editor.vue'),
  },

  {
    path: `/admin`,
    name: RouteName.ADMIN,
    component: () => import('../views/the-admin.vue'),
  },

  {
    path: `/the-article/:eng_title`,
    name: RouteName.ARTICLE,
    component: () => import('../views/the-article.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 158,
      };
    }
    return { top: 0 };
  },
});

export default router;
