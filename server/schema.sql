CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_whatsapp',
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  notification_destination TEXT NOT NULL DEFAULT 'same',
  notification_number TEXT,
  notification_email TEXT,
  reminders_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  reminder_timing TEXT NOT NULL DEFAULT '3h',
  business_hours JSONB DEFAULT '{}'::jsonb,
  timezone TEXT NOT NULL DEFAULT 'Africa/Johannesburg',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS restaurants_whatsapp_number_key ON restaurants(whatsapp_number);

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS messagebird_channel_id TEXT;

ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS notification_destination TEXT NOT NULL DEFAULT 'same';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS notification_number TEXT;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS notification_email TEXT;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS reminders_enabled BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS reminder_timing TEXT NOT NULL DEFAULT '3h';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS business_hours JSONB DEFAULT '{}'::jsonb;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS timezone TEXT NOT NULL DEFAULT 'Africa/Johannesburg';

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  party_size INTEGER NOT NULL DEFAULT 2,
  booking_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  source TEXT NOT NULL DEFAULT 'whatsapp',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reminder_sent_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS bookings_restaurant_time_idx ON bookings(restaurant_id, booking_time);

CREATE TABLE IF NOT EXISTS conversation_states (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_phone TEXT NOT NULL,
  state TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (restaurant_id, customer_phone)
);
