<script setup lang="ts">
import FormField from '@/components/ui/FormField.vue'
import { useAuthStore } from '@/stores/authStore'
import type { AxiosApiResponse } from '@/types/api'
import type { AuthResponse } from '@/types/auth'
import { isAxiosError } from 'axios'
import { useForm } from 'laravel-precognition-vue'
import { Password } from 'primevue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const { token, email } = route.query

const auth = useAuthStore()
const router = useRouter()

const errorMessage = ref<string | null>(null)
const form = useForm('post', '/reset-password', {
  password: '',
  password_confirmation: '',
})

async function handleSubmit() {
  try {
    errorMessage.value = null

    const response = (await form.submit({
      params: { token, email },
    })) as AxiosApiResponse<AuthResponse>

    auth.setAuth(response.data.data)
    router.push('/')
  } catch (error) {
    if (isAxiosError(error)) {
      errorMessage.value = error.response?.data?.message || 'An error occurred'
    }
  }
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-center text-2xl font-semibold">Reset Password</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <Message v-if="errorMessage" severity="error">
        {{ errorMessage }}
      </Message>

      <FormField
        :form="form"
        name="password"
        label="New password"
        :component="Password"
        :props="{
          toggleMask: true,
          fluid: true,
          placeholder: 'Enter your password',
        }"
      />

      <FormField
        :form="form"
        name="password_confirmation"
        label="Confirm new password"
        :component="Password"
        :props="{ toggleMask: true, fluid: true, feedback: false }"
      />

      <Button
        type="submit"
        :loading="form.processing"
        class="mt-2"
        label="Change password"
      />
    </form>
  </div>
</template>
