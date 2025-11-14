import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type RestaurantInfo = {
  id: string
  name: string
  ownerName?: string
  status: string
  whatsappNumber?: string
  notificationDestination?: string
  notificationNumber?: string | null
  notificationEmail?: string | null
  remindersEnabled?: boolean
  reminderTiming?: string
  businessHours?: Record<string, unknown>
  trialEndsAt?: string
}

type AuthState = {
  token: string
  email: string
  userId: string
  restaurant?: RestaurantInfo
}

type AuthContextValue = {
  user: AuthState | null
  loading: boolean
  login: (payload: AuthState) => void
  logout: () => void
  updateRestaurant: (restaurant: Partial<RestaurantInfo>) => void
}

const STORAGE_KEY = 'caboo-auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthState
        setUser(parsed)
      } catch (error) {
        console.warn('Failed to parse auth state', error)
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = (payload: AuthState) => {
    setUser(payload)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  const updateRestaurant = (restaurant: Partial<RestaurantInfo>) => {
    setUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, restaurant: { ...prev.restaurant, ...restaurant } }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      }
      return updated
    })
  }

  const value = useMemo(
    () => ({ user, loading, login, logout, updateRestaurant }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return ctx
}
