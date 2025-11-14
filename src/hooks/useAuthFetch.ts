import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { api } from '@/lib/api'

export function useAuthFetch<T>(path: string, deps: unknown[] = []) {
  const { user } = useAuthContext()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    if (!user?.token) {
      setLoading(false)
      return
    }

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const result = await api.get<T>(path, user.token)
        if (isMounted) setData(result)
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Request failed')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [user?.token, path, ...deps])

  return { data, loading, error }
}
