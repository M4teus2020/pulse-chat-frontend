<script setup lang="ts">
import ContainerComponent from '@/components/ui/ContainerComponent.vue'
import UserSettingsDrawer from '@/components/settings/UserSettingsDrawer.vue'
import PulseLogo from '@/components/icons/PulseLogo.vue'
import MenuItem from './SidebarItem.vue'
import { ref } from 'vue'

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

      <div class="mt-auto flex flex-col gap-2">
        <!-- Settings -->
        <UserSettingsDrawer v-slot="{ toggle }">
          <MenuItem title="Settings" icon="pi pi-cog" @click="toggle()" />
        </UserSettingsDrawer>
      </div>
    </template>
  </ContainerComponent>
</template>
