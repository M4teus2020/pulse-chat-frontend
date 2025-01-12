<script setup lang="ts">
import PrimeLogo from '@/components/icons/PrimeLogo.vue'
import MenuItem from './SidebarItem.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()
function logout() {
  router.push({ name: 'login' })
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
          <PrimeLogo />
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
