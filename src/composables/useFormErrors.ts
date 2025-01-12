import { computed, ref } from 'vue'
import type { ApiError } from '@/types/error'

export function useFormErrors() {
  const error = ref<ApiError | null>(null)

  function setApiError(apiError: ApiError | null) {
    error.value = apiError
  }

  function clearField(field: string) {
    if (error.value?.errors) {
      delete error.value.errors[field]
    }
  }

  function clear() {
    error.value = null
  }

  function hasFieldError(field: string): boolean {
    return !!error.value?.errors?.[field]
  }

  function getFieldError(field: string): string | undefined {
    return error.value?.errors?.[field]?.[0]
  }

  return {
    error,
    message: computed(() => error.value?.message),
    setApiError,
    clearField,
    clear,
    hasFieldError,
    getFieldError,
  }
}
