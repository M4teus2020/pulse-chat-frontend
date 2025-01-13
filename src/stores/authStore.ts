import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RegisterCredentials, User } from '@/types/auth'
import { authRequests } from '@/services/requests/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    try {
      const authResponse = await authRequests.login({ email, password })

      user.value = authResponse.user
      token.value = authResponse.token
      localStorage.setItem('token', authResponse.token)

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
      localStorage.setItem('token', authResponse.token)

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
    try {
      if (token.value) {
        await authRequests.logout()
      }
    } catch (err) {
      console.error(err)
    }

    localStorage.removeItem('token')
    localStorage.removeItem('user')

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
