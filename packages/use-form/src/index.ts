import { useCallback, useState } from 'react'
import isEqual from 'lodash.isequal'
import { default as Axios, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Method, RequestParams, UseFormProps } from './types'
import { objectToFormData } from './formData'
import { getCloudflareAuthCookie } from './cookies'

export function useForm<TForm extends Record<string, any>>(
  initialValues?: TForm
): UseFormProps<TForm> {
  const router = useRouter()

  const [defaults, setDefaults] = useState<TForm>(
    initialValues || ({} as TForm)
  )
  const [data, setData] = useState<TForm>(defaults)
  const [errors, setErrors] = useState({} as Record<keyof TForm, string>)
  const [warnings, setWarnings] = useState({} as Record<keyof TForm, string>)
  const [hasErrors, setHasErrors] = useState(false)
  const [hasWarnings, setHasWarnings] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [wasSuccessful, setWasSuccessful] = useState(false)
  let transform = useCallback((data: TForm) => data, [])

  const submit = useCallback(
    (
      method: Method = Method.GET,
      url: string,
      params: RequestParams<TForm> = {}
    ) => {
      const _options = {
        ...params,
        onStart: () => {
          setWasSuccessful(false)
          setProcessing(true)
          setErrors({} as Record<keyof TForm, string>)
          setWarnings({} as Record<keyof TForm, string>)
          setHasErrors(false)
          if (params.onStart) {
            return params.onStart()
          }
        },
        onSuccess: (data: any) => {
          setProcessing(false)
          setErrors({} as Record<keyof TForm, string>)
          setWarnings({} as Record<keyof TForm, string>)
          setHasErrors(false)
          setWasSuccessful(true)
          if (params.onSuccess) {
            return params.onSuccess(data)
          }
        },
        onForbidden: (data: any) => {
          setProcessing(false)
          setErrors({} as Record<keyof TForm, string>)
          setWarnings({} as Record<keyof TForm, string>)
          setHasErrors(false)
          setWasSuccessful(false)
          if (params.onForbidden) {
            return params.onForbidden(data)
          }
        },
        onError: (errors: Record<keyof TForm, string>) => {
          setProcessing(false)
          setErrors(errors)
          setHasErrors(true)
          if (params.onError) {
            return params.onError(errors)
          }
        },
        onWarning: (warnings: Record<keyof TForm, string>) => {
          setProcessing(false)
          setErrors({} as Record<keyof TForm, string>)
          setWarnings(warnings)
          setHasErrors(false)
          setHasWarnings(true)
          if (params.onWarning) {
            return params.onWarning(warnings)
          }
        },
        onFinish: () => {
          setProcessing(false)
          if (params.onFinish) {
            return params.onFinish()
          }
        },
      }

      _options.onStart()

      const headers = { ..._options.headers }
      headers['X-Requested-With'] = 'XMLHttpRequest'

      const authCookie = getCloudflareAuthCookie()
      if (authCookie) {
        headers['Authorization'] = `Bearer ${authCookie}`
      }

      Axios({
        method,
        url: `${process.env['NEXT_PUBLIC_API_GATEWAY_URL']}${url}`,
        data:
          method === Method.GET
            ? {}
            : _options.forceFormData
              ? objectToFormData(transform(data))
              : transform(data),
        params: method === Method.GET ? data : {},
        headers: headers,
      })
        .then((response) => {
          if (response.status === 401) {
            router.reload()
          } else {
            showToast(response)
          }

          if (
            typeof response.data.errors === 'object' &&
            Object.keys(response.data.errors).length > 0
          ) {
            return _options.onError(response.data.errors)
          }

          if (
            typeof response.data.warnings === 'object' &&
            Object.keys(response.data.warnings).length > 0
          ) {
            return _options.onError(response.data.warnings)
          }

          if (response.status === 403) {
            return _options.onForbidden(response)
          }

          return _options.onSuccess(response.data)
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              router.reload()
            } else {
              showToast(error.response)
            }

            if (
              typeof error.response.data.errors === 'object' &&
              Object.keys(error.response.data.errors).length > 0
            ) {
              return _options.onError(error.response.data.errors)
            }

            if (
              typeof error.response.data.warnings === 'object' &&
              Object.keys(error.response.data.warnings).length > 0
            ) {
              return _options.onWarning(error.response.data.warnings)
            }

            if (error.response.status === 403) {
              return _options.onForbidden(error.response)
            }
          } else {
            return Promise.reject(error)
          }
        })
        .then(() => {
          _options.onFinish()
        })
        .catch((error) => {
          _options.onFinish()
          return Promise.reject(error)
        })
    },
    [data, transform, router]
  )

  return {
    data,
    setData(key, value) {
      setData((data) => ({ ...data, [key]: value }))
    },
    isDirty: !isEqual(data, defaults),
    errors,
    hasErrors,
    warnings,
    hasWarnings,
    processing,
    wasSuccessful,
    transform(callback) {
      transform = callback
    },
    setDefaults(data: TForm) {
      setDefaults(data)
    },
    reset() {
      setData(defaults)
    },
    clearErrors() {
      setErrors(() => {
        setHasErrors(false)
        return {} as Record<keyof TForm, string>
      })
      setWarnings(() => {
        setHasWarnings(false)
        return {} as Record<keyof TForm, string>
      })
    },
    submit,
    get(url, options) {
      submit(Method.GET, url, options)
    },
    post(url, options) {
      submit(Method.POST, url, options)
    },
    put(url, options) {
      submit(Method.PUT, url, options)
    },
    patch(url, options) {
      submit(Method.PATCH, url, options)
    },
    delete(url, options) {
      submit(Method.DELETE, url, options)
    },
  }
}

function showToast(response: AxiosResponse<any, any>) {
  if (response.data.message && typeof response.data.message === 'string') {
    if (response.status < 400) {
      toast.success(response.data.message)
    } else if (response.status >= 400) {
      if (
        typeof response.data.warnings === 'object' ||
        typeof response.data.errors === 'object'
      ) {
        // we will show this in other way to the user
        return
      }
      toast.error(response.data.message)
    } else {
      toast(response.data.message)
    }
  }
}
