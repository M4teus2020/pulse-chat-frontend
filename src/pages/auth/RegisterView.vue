<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  password: '',
})

async function handleSubmit() {
  loading.value = true

  try {
    // TODO: Implementar lógica de registro
    await router.push({ name: 'private' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-center text-2xl font-semibold">Create an account</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-medium">Name</label>
        <InputText
          id="name"
          v-model="form.name"
          placeholder="Enter your name"
          :disabled="loading"
          required
        />
      </div>

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
          :feedback="true"
          toggleMask
          :disabled="loading"
          required
          fluid
        />
      </div>

      <Button type="submit" :loading="loading" class="mt-2">
        Create account
      </Button>

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
