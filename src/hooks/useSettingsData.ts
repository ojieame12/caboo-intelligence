import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { api } from '@/lib/api'

type Hours = Record<string, { open: string; close: string; closed: boolean }>

const defaultHours: Hours = {
  mon: { open: '17:00', close: '23:00', closed: false },
  tue: { open: '17:00', close: '23:00', closed: false },
  wed: { open: '17:00', close: '23:00', closed: false },
  thu: { open: '17:00', close: '23:00', closed: false },
  fri: { open: '17:00', close: '23:00', closed: false },
  sat: { open: '12:00', close: '23:00', closed: false },
  sun: { open: '12:00', close: '22:00', closed: false },
}

export function useSettingsData() {
  const { user, updateRestaurant } = useAuthContext()
  const [connectedNumber, setConnectedNumber] = useState('+27 82 123 4567')
  const [alertDestination, setAlertDestination] = useState<'same' | 'different'>('same')
  const [otherNumber, setOtherNumber] = useState('')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [notificationEmail, setNotificationEmail] = useState('owner@restaurant.com')
  const [remindersEnabled, setRemindersEnabled] = useState(true)
  const [reminderTiming, setReminderTiming] = useState('3h')
  const [businessHours, setBusinessHours] = useState<Hours>(defaultHours)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const hydrate = (data: any) => {
    if (!data) return
    setConnectedNumber(data.whatsappNumber || '+27 82 123 4567')
    setAlertDestination(data.notificationDestination || 'same')
    setOtherNumber(data.notificationNumber || '')
    const hasEmail = Boolean(data.notificationEmail)
    setEmailNotifications(hasEmail)
    setNotificationEmail(data.notificationEmail || '')
    setRemindersEnabled(data.remindersEnabled ?? true)
    setReminderTiming(data.reminderTiming || '3h')
    setBusinessHours({ ...defaultHours, ...(data.businessHours || {}) })
  }

  useEffect(() => {
    let isMounted = true
    async function fetchSettings() {
      if (!user?.token) {
        setLoading(false)
        return
      }
      setLoading(true)
      setError(null)
      try {
        const response = await api.get<{ restaurant: any }>('/api/me', user.token)
        if (!isMounted) return
        hydrate(response.restaurant)
        updateRestaurant(response.restaurant)
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Unable to load settings')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchSettings()
    return () => {
      isMounted = false
    }
  }, [user?.token])

  const saveSettings = async () => {
    if (!user?.token) return
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const payload = {
        notificationDestination: alertDestination,
        notificationNumber: otherNumber,
        emailNotifications,
        notificationEmail,
        remindersEnabled,
        reminderTiming,
        businessHours,
      }
      const result = await api.put<{ restaurant: any }>('/api/settings', payload, user.token)
      hydrate(result.restaurant)
      updateRestaurant(result.restaurant)
      setSuccess('Settings updated successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save settings')
    } finally {
      setSaving(false)
    }
  }

  return {
    connectedNumber,
    alertDestination,
    otherNumber,
    emailNotifications,
    notificationEmail,
    remindersEnabled,
    reminderTiming,
    hours: businessHours,
    loading,
    saving,
    error,
    success,
    setAlertDestination,
    setOtherNumber,
    setEmailNotifications,
    setNotificationEmail,
    setRemindersEnabled,
    setReminderTiming,
    setHours: setBusinessHours,
    saveSettings,
  }
}
