<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { Button, Password } from 'primevue'
import { authRequests } from '@/services/requests/auth'
import { getApiError } from '@/utils'
import { useFormErrors } from '@/composables/useFormErrors'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

const formErrors = useFormErrors()
const form = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const loading = ref(false)

const close = () => {
  dialogRef?.value.close()
}

const handlePasswordChange = async () => {
  try {
    loading.value = true
    formErrors.clear()

    await authRequests.updatePassword(form.value)

    close()
  } catch (err) {
    formErrors.setApiError(
      getApiError(err) || { message: 'Failed to update password' },
    )
  } finally {
    loading.value = false
  }
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
        <label
          for="current_assword"
          class="text-sm font-medium"
          :class="
            formErrors.hasFieldError('current_password') && 'text-red-500'
          "
        >
          Current password
        </label>
        <Password
          id="current_assword"
          v-model="form.current_password"
          :feedback="false"
          fluid
          required
          :disabled="loading"
          :invalid="formErrors.hasFieldError('current_password')"
          @update:modelValue="formErrors.clearField('current_password')"
        />
        <small
          v-if="formErrors.hasFieldError('current_password')"
          class="text-red-500"
        >
          {{ formErrors.getFieldError('current_password') }}
        </small>
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="password"
          class="text-sm font-medium"
          :class="
            formErrors.hasFieldError('password') && 'text-red-500'
          "
        >
          New password
        </label>
        <Password
          id="password"
          v-model="form.password"
          fluid
          required
          :disabled="loading"
          :invalid="formErrors.hasFieldError('password')"
          @update:modelValue="formErrors.clearField('password')"
        />
        <small v-if="formErrors.hasFieldError('password')" class="text-red-500">
          {{ formErrors.getFieldError('password') }}
        </small>
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="password_confirmation"
          class="text-sm font-medium"
          :class="
            formErrors.hasFieldError('password_confirmation') && 'text-red-500'
          "
        >
          Confirm new password
        </label>
        <Password
          id="password_confirmation"
          v-model="form.password_confirmation"
          :feedback="false"
          fluid
          required
          :disabled="loading"
          :invalid="formErrors.hasFieldError('password_confirmation')"
          @update:modelValue="formErrors.clearField('password_confirmation')"
        />
        <small
          v-if="formErrors.hasFieldError('password_confirmation')"
          class="text-red-500"
        >
          {{ formErrors.getFieldError('password_confirmation') }}
        </small>
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Cancel" variant="text" @click="close" size="small" />
      <Button type="submit" label="Done" size="small" :loading="loading" />
    </div>
  </form>
</template>
