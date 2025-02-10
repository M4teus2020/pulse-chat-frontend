<script setup lang="ts">
import SettingsCard from '../components/SettingsCard.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { defineAsyncComponent, onMounted, ref, toRef, type Ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useDialog } from 'primevue/usedialog'
import { Button, DynamicDialog, useToast } from 'primevue'
import type { User } from '@/types/auth'
import { authRequests } from '@/services/requests/auth'

const authStore = useAuthStore()
const user = toRef(authStore, 'user') as Ref<User>
const dialog = useDialog()

onMounted(authStore.fetchCurrentUser)

const changeUsernameDialog = defineAsyncComponent(
  () => import('../components/ChangeUsername.vue'),
)
const showChangeUsernameDialog = () => {
  dialog.open(changeUsernameDialog)
}

const changeEmailDialog = defineAsyncComponent(
  () => import('../components/ChangeEmail.vue'),
)

const showChangeEmailDialog = () => {
  dialog.open(changeEmailDialog)
}

const changePasswordDialog = defineAsyncComponent(
  () => import('../components/ChangePassword.vue'),
)

const showChangePasswordDialog = () => {
  dialog.open(changePasswordDialog)
}

const disableAccountDialog = defineAsyncComponent(
  () => import('../components/DisableAccount.vue'),
)

const confirmDisableAccount = () => {
  dialog.open(disableAccountDialog, { data: { actionType: 'disable' } })
}

const confirmDeleteAccount = () => {
  dialog.open(disableAccountDialog, { data: { actionType: 'delete' } })
}

const changeNameDialog = defineAsyncComponent(
  () => import('../components/ChangeName.vue'),
)

const showChangeNameDialog = () => {
  dialog.open(changeNameDialog)
}

const toast = useToast()
const loadingEmailVerification = ref(false)
const sendVerificationEmail = async () => {
  try {
    loadingEmailVerification.value = true
    await authRequests.sendEmailVerification()
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Verification email sent successfully!',
      life: 2000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error sending verification email',
      life: 2000,
    })

    throw error
  } finally {
    loadingEmailVerification.value = false
  }
}
</script>

<template>
  <div class="space-y-4">
    <Toast />
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
          severity="secondary"
          @click="authStore.logout()"
        />
      </div>

      <div class="flex items-end justify-between">
        <div>
          <h3 class="text-sm text-muted-color">Display Name</h3>
          <p class="font-medium text-color">{{ user.name }}</p>
        </div>

        <Button
          size="small"
          label="Edit"
          icon="pi pi-pencil"
          variant="outlined"
          severity="secondary"
          @click="showChangeNameDialog"
        />
      </div>

      <div class="flex items-end justify-between">
        <div>
          <h3 class="text-sm text-muted-color">Username</h3>
          <p class="font-medium text-color">{{ user.username }}</p>
        </div>

        <Button
          size="small"
          label="Edit"
          icon="pi pi-pencil"
          variant="outlined"
          @click="showChangeUsernameDialog"
          severity="secondary"
        />
      </div>

      <div class="flex items-end justify-between">
        <div>
          <h3 class="text-sm text-muted-color">Email</h3>
          <p class="font-medium text-color">{{ user.email }}</p>
        </div>

        <div class="flex gap-2">
          <Button
            size="small"
            :label="user.email_verified ? 'Verified' : 'Send Verification'"
            @click="user.email_verified ? null : sendVerificationEmail()"
            :severity="user.email_verified ? 'success' : 'primary'"
            :icon="user.email_verified ? 'pi pi-check' : 'pi pi-envelope'"
            variant="outlined"
            :disabled="user.email_verified || loadingEmailVerification"
            :loading="loadingEmailVerification"
          />

          <Button
            size="small"
            label="Edit"
            icon="pi pi-pencil"
            variant="outlined"
            @click="showChangeEmailDialog"
            severity="secondary"
          />
        </div>
      </div>
    </SettingsCard>

    <SettingsCard title="Security">
      <Button
        label="Change Password"
        icon="pi pi-lock"
        size="small"
        @click="showChangePasswordDialog"
      />
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
          @click="confirmDisableAccount"
        />
        <Button
          label="Delete Account"
          icon="pi pi-trash"
          size="small"
          severity="danger"
          variant="outlined"
          @click="confirmDeleteAccount"
        />
      </div>
    </SettingsCard>

    <DynamicDialog />
  </div>
</template>
