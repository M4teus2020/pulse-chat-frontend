<script setup lang="ts">
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { Drawer, SelectButton } from 'primevue'
import AppSettingsTab from './tabs/AppSettingsTab.vue'

const visible = ref(false)
const toggle = useToggle(visible)

const selectedSidebarOption = ref('account')
const sidebarOptions = [
  { label: 'Account', value: 'account' },
  { label: 'App Settings', value: 'app-settings' },
]
</script>

<template>
  <slot :toggle="toggle" />

  <Drawer
    v-model:visible="visible"
    :containerVisible="true"
    header="Settings"
    position="right"
    :pt="{
      root: {
        class: '!max-w-2xl !w-full !h-screen rounded-l-2xl',
      },
      footer: {
        class: 'hidden',
      },
      content: {
        class: 'flex-1 flex flex-col',
      },
    }"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <i class="pi pi-cog" />
        <h1 class="text-xl font-bold">Settings</h1>
      </div>
    </template>

    <template #default>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <SelectButton
            v-model="selectedSidebarOption"
            :options="sidebarOptions"
            option-label="label"
            option-value="value"
            :pt="{
              pcToggleButton: {
                root: { class: 'flex-1 py-2' },
                label: { class: 'text-sm' },
              },
            }"
          />
        </div>

        <AppSettingsTab
          v-if="selectedSidebarOption === 'app-settings'"
          class="scrollbar overflow-y-auto"
        />
      </div>
    </template>
  </Drawer>
</template>
