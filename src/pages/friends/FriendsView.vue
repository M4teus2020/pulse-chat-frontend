<script setup lang="ts">
import ContainerComponent from '@/components/ui/ContainerComponent.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { ref } from 'vue'

const tabs = [
  { label: 'Online', value: 'online' },
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Add Friend', value: 'add-friend' },
]
const tag = ref(tabs[0])

const search = ref('')

const friends = [
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
  <ContainerComponent
    class="h-full w-full"
    header-class="flex text-nowrap px-2"
  >
    <template #header>
      <div class="flex items-center gap-4">
        <i class="pi pi-users text-2xl" />
        <h1 class="text-lg font-medium leading-7 text-color">Friends</h1>
      </div>

      <Divider layout="vertical" />

      <SelectButton v-model="tag" :options="tabs" option-label="label" />
    </template>

    <template #body>
      <!-- Search Bar -->
      <IconField class="mx-2 mb-4">
        <InputText v-model="search" type="text" placeholder="Buscar" fluid />
        <InputIcon class="pi pi-search" />
      </IconField>

      <h2 class="mx-2 mb-4 text-muted-color">
        {{ tag.label }} - {{ friends.length }}
      </h2>

      <!-- Friends List -->
      <div class="scrollbar flex flex-col overflow-y-auto">
        <div
          v-for="friend in friends"
          :key="friend.id"
          class="mx-2 border-t border-surface-100 dark:border-surface-800"
        >
          <div
            class="group -mx-2 flex cursor-pointer items-center gap-3 rounded-lg bg-transparent p-3 text-muted-color hover:bg-emphasis"
          >
            <UserAvatar
              :image="friend.image"
              :status="friend.status"
              :cap-name="friend.capName"
              size="normal"
            />

            <div>
              <p class="font-medium text-color">{{ friend.name }}</p>
              <p class="text-sm text-muted-color">{{ friend.status }}</p>
            </div>

            <div class="ml-auto flex gap-2">
              <Button
                icon="pi pi-comment"
                severity="secondary"
                rounded
                aria-label="Message"
                v-tooltip.top="'Message'"
              />
              <Button
                icon="pi pi-ellipsis-v"
                severity="secondary"
                rounded
                aria-label="More"
                v-tooltip.top="'More'"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </ContainerComponent>
</template>
