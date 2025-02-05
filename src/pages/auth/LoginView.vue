<script setup lang="ts">
import type { AxiosApiResponse } from '@/types/api'
import type { AuthResponse } from '@/types/auth'
import { isAxiosError, type AxiosError } from 'axios'

import { Password } from 'primevue'
import FormField from '@/components/ui/FormField.vue'

import { useAuthStore } from '@/stores/authStore'
import { useForm } from 'laravel-precognition-vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const auth = useAuthStore()
const router = useRouter()

const errorMessage = ref<string | null>(null)
const form = useForm('post', '/login', {
  email: import.meta.env.DEV ? import.meta.env.VITE_DEFAULT_EMAIL : '',
  password: import.meta.env.DEV ? import.meta.env.VITE_DEFAULT_PASSWORD : '',
})

async function handleSubmit() {
  try {
    errorMessage.value = null

    const response = (await form.submit()) as AxiosApiResponse<AuthResponse>

    auth.setAuth(response.data.data)
    router.push('/')
  } catch (error) {
    if (isAxiosError(error) && error.status !== 422) {
      errorMessage.value = error.response?.data?.message || 'An error occurred'
    }
  }
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-center text-2xl font-semibold">Welcome to Pulse!</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <Message v-if="errorMessage" severity="error">
        {{ errorMessage }}
      </Message>

      <FormField
        :form="form"
        name="email"
        label="Email"
        :props="{ type: 'email', placeholder: 'Enter your email' }"
      />

      <FormField
        :form="form"
        name="password"
        label="New password"
        :component="Password"
        :props="{
          toggleMask: true,
          fluid: true,
          feedback: false,
          placeholder: 'Enter your password',
        }"
      />

      <Button
        type="submit"
        :loading="form.processing"
        class="mt-2"
        label="Sign in"
      />

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
