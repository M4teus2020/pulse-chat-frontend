import type { AxiosResponse } from "axios"

export interface ApiResponse<T> {
  data: T
}

export type AxiosApiResponse<T> = AxiosResponse<ApiResponse<T>>
