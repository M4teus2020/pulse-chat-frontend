<script setup lang="ts">
import type { AxiosApiResponse } from '@/types/api'
import type { AuthResponse } from '@/types/auth'
import { useAuthStore } from '@/stores/authStore'
import { useForm } from 'laravel-precognition-vue'
import { useRouter } from 'vue-router'
import FormField from '@/components/ui/FormField.vue'
import { Password } from 'primevue'
import { ref } from 'vue'
import { isAxiosError } from 'axios'

const auth = useAuthStore()
const router = useRouter()

const errorMessage = ref<string | null>(null)
const form = useForm('post', '/register', {
  name: '',
  username: '',
  email: '',
  password: '',
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
    <h1 class="mb-6 text-center text-2xl font-semibold">Join Pulse today</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <Message v-if="errorMessage" severity="error">
        {{ errorMessage }}
      </Message>

      <FormField
        :form="form"
        name="name"
        label="Name"
        :props="{ placeholder: 'Enter your name' }"
      />

      <FormField
        :form="form"
        name="username"
        label="Username"
        :props="{ placeholder: 'Enter your username' }"
      />

      <FormField
        :form="form"
        name="email"
        label="Email"
        :props="{ type: 'email', placeholder: 'Enter your email' }"
      />

      <FormField
        :form="form"
        name="password"
        label="Password"
        :component="Password"
        :props="{
          toggleMask: true,
          fluid: true,
          feedback: true,
          placeholder: 'Enter your password',
        }"
      />

      <Button
        type="submit"
        :loading="form.processing"
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
