export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export type Request = {
  method: Method
  headers: Record<string, string>
}

export type RequestParams<TForm> = Partial<
  Request & {
    onStart: () => void
    onSuccess: (response: any) => void
    onForbidden: (response: any) => void
    onError: (errors: Record<keyof TForm, string>) => void
    onWarning: (warnings: Record<keyof TForm, string>) => void
    onFinish: () => void
    forceFormData: boolean
  }
>

type setDataByKeyValuePair<TForm> = <K extends keyof TForm>(
  key: K,
  value: TForm[K],
) => void

export interface UseFormProps<TForm extends Record<string, any>> {
  data: TForm
  isDirty: boolean
  errors: Record<keyof TForm, string>
  hasErrors: boolean
  warnings: Record<keyof TForm, string>
  hasWarnings: boolean
  processing: boolean
  wasSuccessful: boolean
  setData: setDataByKeyValuePair<TForm>
  transform: (callback: (data: TForm) => TForm) => void
  setDefaults(data: TForm): void
  reset: (...fields: (keyof TForm)[]) => void
  clearErrors: (...fields: (keyof TForm)[]) => void
  submit: (method: Method, url: string, options?: RequestParams<TForm>) => void
  get: (url: string, options?: RequestParams<TForm>) => void
  patch: (url: string, options?: RequestParams<TForm>) => void
  post: (url: string, options?: RequestParams<TForm>) => void
  put: (url: string, options?: RequestParams<TForm>) => void
  delete: (url: string, options?: RequestParams<TForm>) => void
}
