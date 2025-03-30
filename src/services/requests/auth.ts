import api from '../api'
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from '@/types/auth'

export const authRequests = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/login', credentials)
    return response.data.data
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post('/register', credentials)
    return response.data.data
  },

  async getCurrentUserProfile(): Promise<User> {
    const response = await api.get('/user')
    return response.data.data
  },

  async logout(): Promise<void> {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error(error)
    }
  },

  async updatePassword(data: {
    current_password: string
    password: string
    password_confirmation: string
  }): Promise<void> {
    await api.post('/update-password', data)
  },

  async sendEmailVerification(): Promise<void> {
    await api.post('/email/send-verification')
  },

  async requestChangeCode(): Promise<void> {
    await api.post('/email/request-change-code')
  },
}
