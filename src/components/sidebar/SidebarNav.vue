<script setup lang="ts">
import ContainerComponent from '@/components/ui/ContainerComponent.vue'
import UserSettingsDrawer from '@/components/settings/UserSettingsDrawer.vue'
import PulseLogo from '@/components/icons/PulseLogo.vue'
import MenuItem from './SidebarItem.vue'
import MenuLink from './SidebarLink.vue'

const channels = [
  { id: '1', title: 'Channel 1', icon: 'pi pi-home' },
  { id: '2', title: 'Channel 2', icon: 'pi pi-inbox' },
  { id: '3', title: 'Channel 3', icon: 'pi pi-th-large' },
]
</script>

<template>
  <ContainerComponent class="w-auto" headerClass="h-auto">
    <template #header>
      <MenuLink
        :to="{ name: 'private' }"
        title="Private"
        class="border border-primary p-0 "
      >
        <PulseLogo />
      </MenuLink>
    </template>

    <template #body>
      <div class="flex flex-col gap-2">
        <MenuLink
          v-for="channel in channels"
          :key="channel.id"
          :title="channel.title"
          :icon="channel.icon"
          :to="{ name: 'channel', params: { id: channel.id } }"
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
