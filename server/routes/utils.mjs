export function mapRestaurant(row) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    ownerName: row.owner_name,
    whatsappNumber: row.whatsapp_number,
    status: row.status,
    notificationDestination: row.notification_destination,
    notificationNumber: row.notification_number,
    notificationEmail: row.notification_email,
    remindersEnabled: row.reminders_enabled,
    reminderTiming: row.reminder_timing,
    businessHours: row.business_hours || {},
    trialEndsAt: row.trial_ends_at,
  }
}
