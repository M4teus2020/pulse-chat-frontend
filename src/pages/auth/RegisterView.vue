<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { getApiError } from '@/utils'
import { useFormErrors } from '@/composables/useFormErrors'

const authStore = useAuthStore()
const loading = ref(false)

const formErrors = useFormErrors()

const form = ref({
  name: '',
  email: '',
  password: '',
})

async function handleSubmit() {
  try {
    loading.value = true
    formErrors.clear()

    await authStore.register(form.value)
  } catch (err) {
    formErrors.setApiError(getApiError(err) || { message: 'Registro falhou' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-center text-2xl font-semibold">Join Pulse today</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-medium">Name</label>
        <InputText
          id="name"
          v-model="form.name"
          placeholder="Enter your name"
          required
          :disabled="loading"
          :invalid="formErrors.hasFieldError('name')"
          @update:modelValue="formErrors.clearField('name')"
        />
        <small v-if="formErrors.hasFieldError('name')" class="text-red-500">
          {{ formErrors.getFieldError('name') }}
        </small>
      </div>

      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm font-medium">Email</label>
        <InputText
          id="email"
          v-model="form.email"
          placeholder="Enter your email"
          type="email"
          required
          :disabled="loading"
          :invalid="formErrors.hasFieldError('email')"
          @update:modelValue="formErrors.clearField('email')"
        />
        <small v-if="formErrors.hasFieldError('email')" class="text-red-500">
          {{ formErrors.getFieldError('email') }}
        </small>
      </div>

      <div class="flex flex-col gap-2">
        <label for="password" class="text-sm font-medium">Password</label>
        <Password
          id="password"
          v-model="form.password"
          placeholder="Enter your password"
          toggleMask
          required
          fluid
          :feedback="true"
          :disabled="loading"
          :invalid="formErrors.hasFieldError('password')"
          @update:modelValue="formErrors.clearField('password')"
        />
        <small v-if="formErrors.hasFieldError('password')" class="text-red-500">
          {{ formErrors.getFieldError('password') }}
        </small>
      </div>

      <Button
        type="submit"
        :loading="loading"
        class="mt-2"
        label="Create account"
      />

      <div class="mt-4 text-center text-sm">
        Already have an account?
        <RouterLink
          :to="{ name: 'login' }"
          class="font-medium text-primary hover:underline"
        >
          Sign in
        </RouterLink>
      </div>
    </form>
  </div>
</template>
