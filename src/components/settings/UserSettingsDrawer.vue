<script setup lang="ts">
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { Button, Drawer, SelectButton } from 'primevue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

const visible = ref(false)
const toggle = useToggle(visible)

const selectedSidebarOption = ref('account')
const sidebarOptions = [
  { label: 'Account', value: 'account' },
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
]
</script>

<template>
  <slot :toggle="toggle" />

  <Drawer
    v-model:visible="visible"
    :containerVisible="true"
    header="User Settings"
    position="right"
    :pt="{
      root: {
        class: 'p-6 !max-w-2xl !w-full !h-screen rounded-l-2xl',
      },
      footer: {
        class: 'hidden',
      },
      content: {
        class: 'flex-1 flex flex-col',
      },
    }"
  >
    <template #container>
      <div class="flex h-screen flex-col gap-4">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-center gap-3">
            <UserAvatar
              :image="auth.user?.image"
              :cap-name="auth.user?.cap_name"
              size="large"
              shape="square"
              class="overflow-hidden rounded-xl"
            />

            <div class="flex-1">
              <div class="font-medium leading-6 text-color">
                {{ auth.user?.name }}
              </div>
              <div class="mt-1 text-sm leading-5 text-muted-color">
                {{ auth.user?.email }}
              </div>
            </div>

            <Button
              icon="pi pi-sign-out"
              text
              rounded
              severity="secondary"
              @click="auth.logout"
              v-tooltip="'Logout'"
            />
          </div>

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

        <div
          v-if="selectedSidebarOption === 'account'"
          class="scrollbar overflow-y-auto p-4"
        ></div>
      </div>
    </template>
  </Drawer>
</template>
