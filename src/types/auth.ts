export interface User {
  id: string
  name: string
  username: string
  cap_name: string
  email: string
  email_verified: boolean
  image: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
  username: string
}

export interface AuthResponse {
  token: string
  user: User
}
