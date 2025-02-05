<script setup lang="ts">
import { onMounted, inject, type Ref } from 'vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { Message, Password } from 'primevue'
import { useForm } from 'laravel-precognition-vue'
import { useAuthStore } from '@/stores/authStore'
import FormField from '@/components/ui/FormField.vue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

type ActionType = 'disable' | 'delete'

const actionType: ActionType = dialogRef?.value?.data?.actionType || 'disable'

const actionMessages = {
  disable: {
    title: 'Disable Account',
    message:
      'Are you sure that you want to disable your account? This will immediately log you out and make your account inaccessible to anyone.',
    confirmLabel: 'Disable Account',
  },
  delete: {
    title: 'Delete Account',
    message:
      'Are you sure that you want to delete your account? This will immediately log you out of your account and you will not be able to log in again.',
    confirmLabel: 'Delete Account',
  },
} as const

const currentAction = actionMessages[actionType]

function close() {
  dialogRef?.value.close()
}

onMounted(() => {
  if (dialogRef) {
    dialogRef.value.options = {
      props: {
        modal: true,
        header: currentAction.title,
      },
    }
  }
})

const auth = useAuthStore()
const form = useForm(
  actionType === 'disable' ? 'post' : 'delete',
  `/${actionType}-account`,
  {
    password: '',
  },
)

async function handleSubmit() {
  await form.submit()
  auth.logout()
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-sm space-y-4">
    <Message severity="warn" :closable="false" class="mt-px">
      {{ currentAction.message }}
    </Message>

    <FormField
      :form="form"
      name="password"
      label="Password"
      :component="Password"
      :props="{ toggleMask: true, fluid: true, feedback: false }"
    />

    <div class="flex justify-end gap-2">
      <Button variant="text" @click="close" size="small">Cancel</Button>
      <Button
        type="submit"
        :label="currentAction.confirmLabel"
        size="small"
        severity="danger"
        :loading="form.processing"
      />
    </div>
  </form>
</template>
