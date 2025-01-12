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
    const response = await api.get('/profile')
    return response.data.data
  },

  async logout(): Promise<void> {
    await api.post('/logout')
  },
}
