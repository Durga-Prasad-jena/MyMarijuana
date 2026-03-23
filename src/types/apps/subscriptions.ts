export interface SubscriptionApiResponse {
  success: boolean
  message: string
  data: Subscription[]
}

export interface Subscription {
  id: string
  name: string
  price: number
  durationDays?: number
  createdAt: string
  updatedAt: string
}