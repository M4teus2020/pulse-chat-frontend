<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { Button, Password } from 'primevue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const close = () => {
  dialogRef?.value.close()
}

const handlePasswordChange = () => {
  close()
}

onMounted(() => {
  if (dialogRef) {
    dialogRef.value.options = {
      props: {
        modal: true,
        header: 'Update your password',
      },
    }
  }
})
</script>

<template>
  <form @submit.prevent="handlePasswordChange" class="space-y-4">
    <p class="text-muted-color">
      Enter your current password and a new password.
    </p>

    <div class="space-y-2">
      <div class="flex flex-col gap-2">
        <label for="currentPassword" class="text-sm font-medium">Current password</label>
        <Password
          id="currentPassword"
          v-model="currentPassword"
          :feedback="false"
          fluid
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="newPassword" class="text-sm font-medium">New password</label>
        <Password id="newPassword" v-model="newPassword" fluid />
      </div>

      <div class="flex flex-col gap-2">
        <label for="confirmPassword" class="text-sm font-medium">Confirm new password</label>
        <Password
          id="confirmPassword"
          v-model="confirmPassword"
          :feedback="false"
          fluid
        />
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Cancel" variant="text" @click="close" size="small" />
      <Button type="submit" label="Done" size="small" />
    </div>
  </form>
</template>
