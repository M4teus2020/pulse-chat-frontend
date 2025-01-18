export interface User {
  id: string
  name: string
  username: string
  cap_name: string
  email: string
  image: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
}

export interface AuthResponse {
  token: string
  user: User
}
