import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    name: 'app',
    path: '',
    component: () => import('@/layouts/app-layout/AppLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'private',
        path: '',
        component: () => import('@/layouts/private-layout/PrivateLayout.vue'),

        redirect: '/friends',
        children: [
          {
            name: 'friends',
            path: 'friends',
            component: () => import('@/pages/friends/FriendsView.vue'),
          },
          {
            name: 'direct',
            path: 'direct',
            component: () => import('@/pages/direct/DirectView.vue'),
          },
          {
            name: 'direct - :id',
            path: 'direct/:id',
            component: () => import('@/pages/direct/DirectView.vue'),
          },
          {
            name: 'shop',
            path: 'shop',
            component: () => import('@/pages/direct/DirectView.vue'),
          },
        ],
      },
      {
        name: 'channels',
        path: 'channels',
        component: () => import('@/layouts/private-layout/PrivateLayout.vue'),
      },
    ],
  },
  {
    name: 'auth',
    path: '',
    component: () => import('@/layouts/auth-layout/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/LoginView.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/auth/RegisterView.vue'),
      },
    ],
  },
] as RouteRecordRaw[]
