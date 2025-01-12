<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue'
import MainLinkItem from './components/MainLinkItem.vue'
import DirectLinkItem from './components/DirectLinkItem.vue'

const navItems = [
  { icon: 'pi pi-users', title: 'Friends', path: '/friends' },
  { icon: 'pi pi-envelope', title: 'Message Requests', path: '/direct' },
  { icon: 'pi pi-shopping-cart', title: 'Shop', path: '/shop' },
]

const directMessages = [
  {
    id: '1',
    image:
      'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
    name: 'Cody Fisher',
    capName: 'CF',
    status: 'online',
    unreadMessageCount: 8,
  },
  {
    id: '2',
    image:
      'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png',
    name: 'PrimeTek Team',
    capName: 'PT',
    status: 'offline',
    unreadMessageCount: 0,
  },
  {
    id: '3',
    image:
      'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
    name: 'Jerome Bell',
    capName: 'JB',
    status: 'idle',
    unreadMessageCount: 4,
  },
  {
    id: '4',
    image:
      'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
    name: 'Robert Fox',
    capName: 'RF',
    status: 'offline',
    unreadMessageCount: 0,
  },
  {
    id: '5',
    image:
      'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
    name: 'Esther Howard',
    capName: 'EH',
    status: 'not_disturb',
    unreadMessageCount: 9,
  },
  {
    id: '6',
    image:
      'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
    name: 'Darlene Robertson',
    capName: 'DR',
    status: 'not_disturb',
    unreadMessageCount: 0,
  },
  {
    id: '7',
    image:
      'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
    name: 'Ralph Edwards',
    capName: 'RE',
    status: 'offline',
    unreadMessageCount: 0,
  },
  {
    id: '8',
    image: null,
    name: 'Ronald Richards',
    capName: 'RR',
    status: 'offline',
    unreadMessageCount: 0,
  },
  {
    id: '9',
    image: null,
    name: 'Kristin Watson',
    capName: 'KW',
    status: 'offline',
    unreadMessageCount: 0,
  },
  {
    id: '10',
    image:
      'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
    name: 'Darrell Steward',
    capName: 'DS',
    status: 'offline',
    unreadMessageCount: 0,
  },
]
</script>

<template>
  <div class="flex h-full w-full gap-4">
    <div
      class="flex w-72 flex-col rounded-2xl bg-surface-50 p-5 dark:bg-surface-900"
    >
      <div>
        <!-- Search -->
        <InputText placeholder="Find or start a conversation" class="w-full" />

        <Divider />
      </div>

      <div class="scrollbar-fade flex-grow overflow-y-auto">
        <!-- Main Links -->
        <div class="flex flex-col gap-2">
          <MainLinkItem
            v-for="(navItem, index) in navItems"
            :key="index"
            :icon="navItem.icon"
            :title="navItem.title"
            :path="navItem.path"
          />
        </div>

        <Divider />

        <!-- Direct Messages -->
        <div
          class="flex cursor-pointer items-center justify-between px-2 text-xs transition-all text-muted-color hover:text-color"
        >
          <span class="font-medium leading-5"> Direct Messages </span>

          <i class="pi pi-plus"></i>
        </div>

        <div class="mt-4 flex flex-col gap-2">
          <DirectLinkItem
            v-for="directMessage in directMessages"
            :key="directMessage.id"
            :id="directMessage.id"
            :image="directMessage.image"
            :name="directMessage.name"
            :cap-name="directMessage.capName"
            :status="directMessage.status"
            :unread-message-count="directMessage.unreadMessageCount"
          />
        </div>
      </div>

      <UserInfo />
    </div>

    <div class="flex flex-1 rounded-2xl bg-surface-50 p-5 dark:bg-surface-900">
      <RouterView />
    </div>
  </div>
</template>
