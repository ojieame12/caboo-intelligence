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

  const updateStatus = async (id: string, status: 'confirmed' | 'cancelled' | 'pending') => {
    if (!user?.token) {
      throw new Error('Not authenticated')
    }
    const result = await api.put<{ booking: BookingRecord }>(`/api/bookings/${id}`, { status }, user.token)
    setBookings((prev) => prev.map((b) => (b.id === id ? result.booking : b)))
    return result.booking
  }

  const resendConfirmation = async (id: string) => {
    if (!user?.token) {
      throw new Error('Not authenticated')
    }
    await api.post(`/api/bookings/${id}/resend`, {}, user.token)
    return true
  }

  const addBooking = async ({
    customerName,
    customerPhone,
    partySize,
    bookingTime,
    notes,
  }: {
    customerName: string
    customerPhone?: string
    partySize: number
    bookingTime: string
    notes?: string
  }) => {
    if (!user?.token) {
      throw new Error('Not authenticated')
    }
    const result = await api.post<{ booking: BookingRecord }>(
      '/api/bookings',
      {
        customerName,
        customerPhone,
        partySize,
        bookingTime,
        notes,
      },
      user.token,
    )
    setBookings((prev) => {
      const next = [result.booking, ...prev]
      return next.sort((a, b) => new Date(a.booking_time).getTime() - new Date(b.booking_time).getTime())
    })
    return result.booking
  }

  return useMemo(
    () => ({ bookings, loading, error, updateStatus, addBooking, resendConfirmation }),
    [bookings, loading, error],
  )
}
