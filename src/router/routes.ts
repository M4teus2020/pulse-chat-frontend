import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    name: 'app',
    path: '',
    component: () => import('@/layouts/app-layout/AppLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    redirect: '/private',
    children: [
      {
        name: 'private',
        path: 'private',
        component: () => import('@/layouts/private-layout/PrivateLayout.vue'),

        redirect: '/private/friends',
        children: [
          {
            name: 'friends',
            path: 'friends',
            component: () => import('@/pages/friends/FriendsView.vue'),
          },
          {
            name: 'directs',
            path: 'directs',
            component: () => import('@/pages/direct/DirectView.vue'),
          },
          {
            name: 'direct',
            path: 'direct/:id',
            component: () => import('@/pages/direct/DirectView.vue'),
          },
          {
            name: 'shop',
            path: 'shop',
            component: () => import('@/pages/shop/ShopView.vue'),
          },
        ],
      },
      {
        name: 'channel',
        path: 'channel/:id',
        component: () => import('@/layouts/channel-layout/ChannelLayout.vue'),
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
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/pages/auth/ResetPasswordView.vue'),
      },
    ],
  },
] as RouteRecordRaw[]
