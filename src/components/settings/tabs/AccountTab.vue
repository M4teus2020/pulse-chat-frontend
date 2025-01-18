<script setup lang="ts">
import SettingsCard from '../components/SettingsCard.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { defineAsyncComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useDialog } from 'primevue/usedialog'
import { DynamicDialog } from 'primevue'

const authStore = useAuthStore()

const user = ref(authStore.user!)

const dialog = useDialog()

const changeUsernameDialog = defineAsyncComponent(
  () => import('../components/ChangeUsername.vue'),
)
const showChangeUsernameDialog = () => {
  dialog.open(changeUsernameDialog)
}
</script>

<template>
  <div class="space-y-4">
    <SettingsCard title="Profile">
      <div class="flex items-center justify-between">
        <div
          class="group relative h-min w-min cursor-pointer select-none overflow-hidden rounded-full"
        >
          <UserAvatar
            :image="user.image"
            :cap-name="user.cap_name"
            size="xlarge"
          />
          <div
            class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <i class="pi pi-pencil text-white"></i>
          </div>
        </div>

        <Button
          size="small"
          label="Logout"
          icon="pi pi-sign-out"
          icon-pos="right"
          severity="primary"
          @click="authStore.logout()"
        />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm text-muted-color">Display Name</h3>
          <p class="font-medium text-color">{{ user.name }}</p>
        </div>

        <Button size="small" label="Edit" severity="secondary" />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm text-muted-color">Username</h3>
          <p class="font-medium text-color">{{ user.username }}</p>
        </div>

        <Button
          size="small"
          label="Edit"
          @click="showChangeUsernameDialog"
          severity="secondary"
        />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm text-muted-color">Email</h3>
          <p class="font-medium text-color">{{ user.email }}</p>
        </div>

        <Button size="small" label="Edit" severity="secondary" />
      </div>
    </SettingsCard>

    <SettingsCard title="Security">
      <Button label="Change Password" icon="pi pi-lock" size="small" />
    </SettingsCard>

    <SettingsCard title="Account Removal">
      <p class="text-sm text-muted-color">
        Deleting your account is irreversible and will remove all of your data
        from our systems. This action cannot be undone.
      </p>

      <div class="flex gap-2">
        <Button
          label="Disable Account"
          icon="pi pi-lock"
          size="small"
          severity="danger"
        />
        <Button
          label="Delete Account"
          icon="pi pi-trash"
          size="small"
          severity="danger"
          variant="outlined"
        />
      </div>
    </SettingsCard>

    <DynamicDialog />
  </div>
</template>
