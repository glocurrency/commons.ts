export interface BasicEventData {
  app: string
  eventType: string
  targetId?: string
  targetType: string
  actorId?: string
  actorType: string
  payload?: string
  prevPayload?: string
  timestamp: string
}
