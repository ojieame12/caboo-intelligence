import { useAuthFetch } from './useAuthFetch'

export type BookingSummary = {
  id: string
  customer_name: string
  party_size: number
  booking_time: string
  status: string
}

export type DashboardSummary = {
  connection: {
    phoneNumber?: string
    lastBookingAt?: string | null
  }
  today: BookingSummary[]
  tomorrow: BookingSummary[]
  stats: {
    bookings: number
    messages: number
    noShowsPrevented: number
    moneySaved: number
  }
  quickActions: {
    remindersEnabled: boolean
  }
  trial: {
    trialEndsAt?: string | null
  }
}

export function useDashboardSummary() {
  return useAuthFetch<DashboardSummary>('/api/dashboard/summary', [])
}
