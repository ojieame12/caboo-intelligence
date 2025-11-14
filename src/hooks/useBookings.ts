import { useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { api } from '@/lib/api'

export type BookingRecord = {
  id: string
  customer_name: string
  customer_phone: string | null
  party_size: number
  status: string
  source: string
  notes: string | null
  booking_time: string
  created_at: string
}

export function useBookings(filter: string, search: string) {
  const { user } = useAuthContext()
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    if (!user?.token) {
      setLoading(false)
      return
    }

    const timeout = setTimeout(() => {
      async function fetchBookings() {
        setLoading(true)
        setError(null)
        try {
          const params = new URLSearchParams({ filter })
          if (search) params.append('search', search)
          const result = await api.get<{ bookings: BookingRecord[] }>(`/api/bookings?${params.toString()}`, user.token)
          if (isMounted) setBookings(result.bookings)
        } catch (err) {
          if (isMounted) setError(err instanceof Error ? err.message : 'Unable to load bookings')
        } finally {
          if (isMounted) setLoading(false)
        }
      }
      fetchBookings()
    }, 300)

    return () => {
      isMounted = false
      clearTimeout(timeout)
    }
  }, [user?.token, filter, search])

  return useMemo(() => ({ bookings, loading, error }), [bookings, loading, error])
}
