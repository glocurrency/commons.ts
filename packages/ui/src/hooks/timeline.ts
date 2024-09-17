import queryString from 'query-string'
import { useGet } from '@glocurrency/use-get'
import { BasicEventData } from '../types'

export function useGetEventsFor(
  app: string,
  targetType: string,
  targetId: string,
) {
  const query = queryString.stringify({
    targetType,
    targetId,
    app,
  })
  return useGet<BasicEventData[]>(`/events?${query}`)
}
