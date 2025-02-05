<script setup lang="ts">
import { inject, onMounted, type Ref } from 'vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { Button, Password } from 'primevue'
import { useForm } from 'laravel-precognition-vue'
import FormField from '@/components/ui/FormField.vue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const close = () => dialogRef?.value.close()

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

const form = useForm('post', '/profile/update-password', {
  current_password: '',
  password: '',
  password_confirmation: '',
})

async function handleSubmit() {
  await form.submit()
  close()
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <p class="text-muted-color">
      Enter your current password and a new password.
    </p>

    <div class="space-y-2">
      <FormField
        :form="form"
        name="current_password"
        label="Current password"
        :component="Password"
        :props="{ toggleMask: true, fluid: true, feedback: false }"
      />

      <FormField
        :form="form"
        name="password"
        label="New password"
        :component="Password"
        :props="{ toggleMask: true, fluid: true }"
      />

      <FormField
        :form="form"
        name="password_confirmation"
        label="Confirm new password"
        :component="Password"
        :props="{ toggleMask: true, fluid: true, feedback: false }"
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
