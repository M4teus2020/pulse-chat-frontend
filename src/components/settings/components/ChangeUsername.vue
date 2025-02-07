<script setup lang="ts">
import FormField from '@/components/ui/FormField.vue'
import { useAuthStore } from '@/stores/authStore'
import type { AxiosApiResponse } from '@/types/api'
import type { User } from '@/types/auth'
import { useForm } from 'laravel-precognition-vue'
import { Password } from 'primevue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { onMounted, type Ref } from 'vue'
import { inject } from 'vue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const auth = useAuthStore()

function close() {
  dialogRef?.value.close()
}

onMounted(() => {
  if (dialogRef) {
    dialogRef.value.options.props = {
      header: 'Change Username',
      modal: true,
    }
  }
})

const form = useForm('post', '/profile/update-username', {
  username: auth.user?.username || '',
  password: '',
})

async function handleSubmit() {
  const response = await form.submit() as AxiosApiResponse<User>
  auth.setUser(response.data.data)
  close()
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <span class="block text-surface-500 dark:text-surface-400">
      Enter a new username and your existing password.
    </span>

    <div class="space-y-2">
      <FormField
        :form="form"
        name="username"
        label="Username"
        :props="{ placeholder: 'Enter your username' }"
      />

      <FormField
        :form="form"
        name="password"
        label="Current Password"
        :component="Password"
        :props="{ toggleMask: true, fluid: true, feedback: false }"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button variant="text" @click="close" size="small">Cancel</Button>
      <Button type="submit" size="small" :loading="form.processing">Done</Button>
    </div>
  </form>
</template>
