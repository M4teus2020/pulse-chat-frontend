import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthResponse, User } from '@/types/auth'
import { authRequests } from '@/services/requests/auth'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const token = useStorage<string | null>('token', null)
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(authResponse: AuthResponse) {
    user.value = authResponse.user
    token.value = authResponse.token
  }

  function setUser(value: User) {
    user.value = value
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

    setAuth,
    setUser,

    logout,
    fetchCurrentUser,
  }
})
