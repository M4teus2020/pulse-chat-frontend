<script setup lang="ts">
import PulseLogo from '@/components/icons/PulseLogo.vue'
import MenuItem from './SidebarItem.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
const selectedSidebarNav = ref('Overview')
const navItems = [
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

const authStore = useAuthStore()
function logout() {
  authStore.logout()
}
</script>

<template>
  <div
    class="flex h-full flex-col justify-between rounded-2xl bg-surface-50 p-5 dark:bg-surface-900"
  >
    <div>
      <div class="flex items-center gap-3">
        <div
          class="flex size-12 items-center justify-center rounded-xl border border-primary"
        >
          <PulseLogo />
        </div>
      </div>

      <Divider />

      <!-- Main Links -->
      <div class="flex flex-col gap-2">
        <MenuItem
          v-for="navItem in navItems"
          :key="navItem.title"
          :title="navItem.title"
          :icon="navItem.icon"
          :selected="selectedSidebarNav === navItem.title"
          @click="setSelectedSidebarNav(navItem.title)"
        />
      </div>
    </div>

    <!-- Settings -->
    <div class="flex flex-col gap-2">
      <MenuItem title="Settings" icon="pi pi-cog" @click="toggleDarkMode" />
      <MenuItem title="Logout" icon="pi pi-sign-out" @click="logout" />
    </div>
  </div>
</template>
