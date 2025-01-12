<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { getApiError } from '@/utils'
import { useFormErrors } from '@/composables/useFormErrors'

const auth = useAuthStore()
const loading = ref(false)

const formErrors = useFormErrors()

const form = ref({
  email: import.meta.env.DEV ? import.meta.env.VITE_DEFAULT_EMAIL : '',
  password: import.meta.env.DEV ? import.meta.env.VITE_DEFAULT_PASSWORD : '',
})

async function handleSubmit() {
  try {
    loading.value = true
    formErrors.clear()

    await auth.login(form.value.email, form.value.password)
  } catch (err) {
    formErrors.setApiError(getApiError(err) || { message: 'Login failed' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-center text-2xl font-semibold">Welcome to Pulse!</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <Message v-if="formErrors.message.value" severity="error">
        {{ formErrors.message.value }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm font-medium">Email</label>
        <InputText
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          :disabled="loading"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="password" class="text-sm font-medium">Password</label>
        <Password
          id="password"
          v-model="form.password"
          placeholder="Enter your password"
          :feedback="false"
          toggleMask
          :disabled="loading"
          required
          fluid
        />
      </div>

      <Button type="submit" :loading="loading" class="mt-2">Sign in</Button>

      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <RouterLink
          :to="{ name: 'register' }"
          class="font-medium text-primary hover:underline"
        >
          Create account
        </RouterLink>
      </div>
    </form>
  </div>
</template>
