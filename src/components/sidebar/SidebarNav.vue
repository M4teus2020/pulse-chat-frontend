<script setup lang="ts">
import ContainerComponent from '../ui/ContainerComponent.vue'
import PulseLogo from '@/components/icons/PulseLogo.vue'
import MenuItem from './SidebarItem.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const authStore = useAuthStore()

const toggleDark = useToggle(isDark)

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
</script>

<template>
  <ContainerComponent class="w-auto" headerClass="h-auto">
    <template #header>
      <div
        class="flex size-12 items-center justify-center rounded-xl border border-primary"
      >
        <PulseLogo />
      </div>
    </template>

    <template #body>
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

      <!-- Settings -->
      <div class="mt-auto flex flex-col gap-2">
        <MenuItem title="Settings" icon="pi pi-cog" @click="toggleDark()" />
        <MenuItem
          title="Logout"
          icon="pi pi-sign-out"
          @click="authStore.logout()"
        />
      </div>
    </template>
  </ContainerComponent>
</template>
