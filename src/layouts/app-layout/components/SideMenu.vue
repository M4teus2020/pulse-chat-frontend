<script setup lang="ts">
import PrimeLogo from '@/components/icons/PrimeLogo.vue'
import MenuItem from './MenuItem.vue'
import { ref } from 'vue'

const isSlimMenu = ref(false)

const selectedSidebarNav = ref('Overview')
const SidebarNavs = [
  { icon: 'pi pi-home', title: 'Overview' },
  { icon: 'pi pi-comment', title: 'Chat' },
  { icon: 'pi pi-inbox', title: 'Inbox' },
  { icon: 'pi pi-th-large', title: 'Cards' },
  { icon: 'pi pi-user', title: 'Customers' },
  { icon: 'pi pi-video', title: 'Movies' },
]

function setSelectedSidebarNav(title: string) {
  selectedSidebarNav.value = title
}

function toggleDarkMode() {
  document.documentElement.classList.toggle('p-dark')
}

function toggleSlimMenu() {
  isSlimMenu.value = !isSlimMenu.value
}
</script>

<template>
  <div
    :class="isSlimMenu ? 'w-auto' : 'w-72'"
    class="flex h-full flex-col justify-between rounded-2xl bg-surface-50 p-5 dark:bg-surface-900"
  >
    <div :class="isSlimMenu ? 'w-12' : 'w-auto'">
      <div class="flex items-center gap-3">
        <div
          class="flex size-12 items-center justify-center rounded-xl border border-primary"
        >
          <PrimeLogo />
        </div>

        <div
          v-show="!isSlimMenu"
          class="text-3xl font-medium text-surface-950 dark:text-surface-0"
        >
          Prime
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-2">
        <MenuItem
          v-for="navItem in SidebarNavs"
          :key="navItem.title"
          :title="navItem.title"
          :icon="navItem.icon"
          :is-slim-menu="isSlimMenu"
          :selected="selectedSidebarNav === navItem.title"
          @click="setSelectedSidebarNav(navItem.title)"
        />
      </div>
    </div>

    <div :class="isSlimMenu ? 'w-12' : 'w-auto'">
      <div class="flex flex-col gap-2">
        <MenuItem
          title="Slim Mode"
          :icon="isSlimMenu ? 'pi pi-window-maximize' : 'pi pi-window-minimize'"
          :is-slim-menu="isSlimMenu"
          @click="toggleSlimMenu"
        />

        <MenuItem
          title="Settings"
          icon="pi pi-cog"
          :is-slim-menu="isSlimMenu"
          @click="toggleDarkMode"
        />
      </div>

      <Divider />

      <div
        :class="isSlimMenu ? 'justify-center' : 'gap-3'"
        class="flex items-center"
      >
        <Avatar
          image="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png"
          size="large"
          shape="circle"
          class="shrink-0"
        />

        <div v-show="!isSlimMenu">
          <div class="text-base font-medium leading-5 text-color">
            Robin Jonas
          </div>
          <div class="mt-1 text-sm text-muted-color">hi@robin.xyz</div>
        </div>
      </div>
    </div>
  </div>
</template>
