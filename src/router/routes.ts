import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    component: () => import('@/layouts/app-layout/AppLayout.vue'),
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
] as RouteRecordRaw[]
