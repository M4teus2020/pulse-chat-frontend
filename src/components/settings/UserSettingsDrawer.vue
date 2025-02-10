<script setup lang="ts">
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { Drawer, SelectButton } from 'primevue'
import AccountTab from './tabs/AccountTab.vue'
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
        class: 'max-w-xl w-full rounded-l-2xl',
      },
      footer: {
        class: 'hidden',
      },
      content: {
        class: 'flex-1 flex flex-col h-full',
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
      <div class="mb-4 flex flex-col gap-4">
        <SelectButton
          v-model="selectedSidebarOption"
          :options="sidebarOptions"
          option-label="label"
          option-value="value"
          :allow-empty="false"
          :pt="{
            pcToggleButton: {
              root: { class: 'flex-1 py-2' },
              label: { class: 'text-sm' },
            },
          }"
        />
      </div>

      <AccountTab
        v-if="selectedSidebarOption === 'account'"
        class="scrollbar overflow-y-auto"
      />

      <AppSettingsTab
        v-if="selectedSidebarOption === 'app-settings'"
        class="scrollbar overflow-y-auto"
      />
    </template>
  </Drawer>
</template>
