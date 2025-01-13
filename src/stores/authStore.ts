import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RegisterCredentials, User } from '@/types/auth'
import { authRequests } from '@/services/requests/auth'
import router from '@/router'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const token = useStorage<string | null>('token', null)
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    try {
      const authResponse = await authRequests.login({ email, password })

      user.value = authResponse.user
      token.value = authResponse.token

      await router.push({ name: 'private' })
    } catch (err) {
      throw err
    }
  }

  async function register(credentials: RegisterCredentials) {
    try {
      const authResponse = await authRequests.register(credentials)

      user.value = authResponse.user
      token.value = authResponse.token

      await router.push({ name: 'private' })
    } catch (err) {
      throw err
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) return null

    try {
      const currentUser = await authRequests.getCurrentUserProfile()

      user.value = currentUser

      return currentUser
    } catch (err) {
      console.error(err)

      logout()
      return null
    }
  }

  async function logout() {
    await authRequests.logout()

    token.value = null

    window.location.href = '/login'
  }

  if (isAuthenticated.value) {
    fetchCurrentUser()
  }

  return {
    user,

    isAuthenticated,

    login,
    register,
    logout,
    fetchCurrentUser,
  }
})
