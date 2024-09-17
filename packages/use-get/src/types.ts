export interface ValidationErrors {
  readonly [key: string]: string
}

export interface ApiErrorResponse {
  readonly code?: number
  readonly message?: string
  readonly errors?: ValidationErrors
}

export interface ApiResponse<T> extends ApiErrorResponse {
  readonly data?: T
}
