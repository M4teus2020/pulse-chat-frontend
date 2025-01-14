import type { ApiError } from '@/types/error'
import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isAxiosError } from 'axios'

export function getApiError(error: unknown): ApiError | null {
  if (!isAxiosError(error)) return null
  if (!error.response) return null
  if (typeof error.response.data !== 'object') return null
  if (!('message' in error.response.data)) return null

  return error.response.data as ApiError
}

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}
