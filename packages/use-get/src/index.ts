import useSWR from 'swr'
import axios from 'axios'
import { ApiResponse } from './types'
import { getCloudflareAuthCookie } from './cookies'

function defaultHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest',
  }

  const authCookie = getCloudflareAuthCookie()
  if (authCookie) {
    headers['Authorization'] = `Bearer ${authCookie}`
  }

  return headers
}

function makeGatewayUrl(url: string): string {
  return `${process.env['NEXT_PUBLIC_API_GATEWAY_URL']}${url}`
}

async function axiosFetcher(url: string) {
  return await axios
    .get(url, {
      headers: defaultHeaders(),
    })
    .then(res => res.data)
}

export async function fetchBlob(url: string): Promise<Blob> {
  return fetch(url, {
    method: 'GET',
    headers: defaultHeaders(),
  }).then(response => response.blob())
}

export function useGet<T>(url: string) {
  const { data, error, mutate, isValidating, isLoading } = useSWR<
    ApiResponse<T>
  >(makeGatewayUrl(url), axiosFetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  })

  return {
    response: data,
    mutate: mutate,
    isLoading: isLoading || isValidating,
    isError: error || !data,
  }
}
