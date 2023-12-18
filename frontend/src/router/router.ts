import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getLocalStageData } from '../common/utils';

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
  LOGIN = 'the-login',
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
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
    path: `/login`,
    name: RouteName.LOGIN,
    component: () => import('../views/the-login.vue'),
    beforeEnter: (to, from, next) => goToHome(to, from, next),
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
  {
    path: '/',
    meta: { authRequired: true, role: Role.ADMIN },
    children: [
      {
        path: `/admin`,
        name: RouteName.ADMIN,
        component: () => import('../views/the-admin.vue'),
      },
    ],
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

router.beforeEach(async (to, from, next) => {
  const { authRequired, role } = to.meta;
  const loginFlag = getLocalStageData('isLogIn', 'boolean');

  if (!authRequired) {
    next();
    return;
  }

  if (authRequired && role === Role.ADMIN && !loginFlag) {
    next({ name: RouteName.LOGIN });
  } else if (authRequired && role === Role.USER && loginFlag) {
    next({ name: RouteName.HOME });
  } else {
    next();
  }
});

const goToHome = (to, from, next) => {
  const loginFlag = getLocalStageData('isLogIn', 'boolean');
  if (loginFlag) next({ name: RouteName.HOME });
  next();
};

export default router;
