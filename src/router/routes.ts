import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/myDesk',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/setting/SettingPage.vue'),
      },
    ],
  },

  // Data Menu
  {
    path: '/data',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/data/DataDbConnect.vue'),
      },
      {
        path: 'dbConnect',
        component: () => import('pages/data/DataDbConnect.vue'),
      },
    ],
  },

  // Admin Menu
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/admin/AdminSettingPage.vue'),
      },
      {
        path: 'code',
        component: () => import('pages/admin/AdminCodePage.vue'),
      },
      {
        path: 'user',
        component: () => import('pages/admin/AdminUserPage.vue'),
      },
      {
        path: 'menu',
        component: () => import('pages/admin/AdminMenuPage.vue'),
      },
      {
        path: 'setting',
        component: () => import('pages/admin/AdminSettingPage.vue'),
      },
    ],
  },
  // Sample Menu
  {
    path: '/sample',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/sample/TestPage.vue'),
      },
      {
        path: 'icon',
        component: () => import('pages/sample/IconPage.vue'),
      },
      {
        path: 'single-search-form',
        component: () => import('pages/sample/SingleSearchFormPage.vue'),
      },
      {
        path: 'single-search-form-side',
        component: () => import('pages/sample/SingleSearchFormSidePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
