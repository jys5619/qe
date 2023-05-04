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

  // Admin Menu
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/admin/AdminSettingManagementPage.vue'),
      },
      {
        path: 'setting-management',
        component: () => import('pages/admin/AdminSettingManagementPage.vue'),
      },
      {
        path: 'user-management',
        component: () => import('pages/admin/AdminUserManagementPage.vue'),
      },
      {
        path: 'menu-management',
        component: () => import('pages/admin/AdminMenuManagementPage.vue'),
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
