<script setup lang="ts">
import { inject, onMounted, type Ref } from 'vue'

import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import type { AxiosApiResponse } from '@/types/api'
import type { User } from '@/types/auth'

import { useForm } from 'laravel-precognition-vue'
import { useAuthStore } from '@/stores/authStore'

import { Button } from 'primevue'
import FormField from '@/components/ui/FormField.vue'

const auth = useAuthStore()
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const close = () => dialogRef?.value.close()

onMounted(() => {
  if (dialogRef) {
    dialogRef.value.options = {
      props: {
        modal: true,
        header: 'Update your name',
      },
    }
  }
})

const form = useForm('post', '/profile/update-name', {
  name: auth.user?.name || '',
})

async function handleSubmit() {
  const response = (await form.submit()) as AxiosApiResponse<User>
  auth.setUser(response.data.data)
  close()
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-96 space-y-4">
    <div class="space-y-2">
      <FormField
        :form="form"
        name="name"
        label="Name"
        :props="{ placeholder: 'Enter your name' }"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Cancel" variant="text" @click="close" size="small" />
      <Button
        type="submit"
        label="Done"
        size="small"
        :loading="form.processing"
      />
    </div>
  </form>
</template>
