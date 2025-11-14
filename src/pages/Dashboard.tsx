import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/subframe/components/Button";
import { FeatherCheck, FeatherAlertCircle } from "@subframe/core";
import { useAuthContext } from "@/context/AuthContext";
import { api } from "@/lib/api";

type BookingSummary = {
  id: string;
  customer_name: string;
  party_size: number;
  booking_time: string;
  status: string;
};

type DashboardSummary = {
  connection: {
    phoneNumber?: string;
    lastBookingAt?: string | null;
  };
  today: BookingSummary[];
  tomorrow: BookingSummary[];
  stats: {
    bookings: number;
    messages: number;
    noShowsPrevented: number;
    moneySaved: number;
  };
  quickActions: {
    remindersEnabled: boolean;
  };
  trial: {
    trialEndsAt?: string | null;
  };
};

function Dashboard() {
  const { user, logout } = useAuthContext();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchSummary() {
      if (!user?.token) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.get<DashboardSummary>("/api/dashboard/summary", user.token);
        if (isMounted) {
          setSummary(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load dashboard.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchSummary();
    return () => {
      isMounted = false;
    };
  }, [user?.token]);

  const trialBadge = useMemo(() => {
    if (!summary?.trial?.trialEndsAt) return "Trial active";
    const trialEndDate = new Date(summary.trial.trialEndsAt);
    const now = new Date();
    const diff = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `Trial: ${diff} day${diff === 1 ? "" : "s"} left` : "Trial ended";
  }, [summary]);

  const formatterTime = useMemo(
    () =>
      new Intl.DateTimeFormat("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    [],
  );

  const formatterDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-ZA", {
        month: "short",
        day: "numeric",
      }),
    [],
  );

  const formatTime = (iso: string) => formatterTime.format(new Date(iso));
  const formatDate = (iso: string) => formatterDate.format(new Date(iso));

  const connectionLabel = summary?.connection.phoneNumber
    ? `${summary.connection.phoneNumber}${
        summary.connection.lastBookingAt
          ? ` • Last booking ${formatDate(summary.connection.lastBookingAt)}`
          : ""
      }`
    : "No number connected yet";

  const todayBookings = summary?.today ?? [];
  const tomorrowBookings = summary?.tomorrow ?? [];
  const stats = summary?.stats;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCF6EF]">
        <p className="font-['Geist'] text-neutral-500 text-[15px]">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCF6EF] px-6 text-center">
        <div className="max-w-md">
          <p className="font-['Geist'] text-[15px] text-error-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-default-background">
      {/* Navbar */}
      <div className="w-full border-b border-neutral-border bg-white sticky top-0 z-50">
        <div className="flex w-full max-w-[1400px] mx-auto items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center gap-6 md:gap-8">
            <a href="/">
              <img
                className="h-6 flex-none object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
                alt="Caboo Logo"
              />
            </a>
            <nav className="flex items-center gap-4 md:gap-6">
              <a href="/dashboard" className="font-['Inter'] text-[14px] font-[500] text-neutral-900">
                Overview
              </a>
              <a href="/dashboard/bookings" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
                Bookings
              </a>
              <a href="/dashboard/settings" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
                Settings
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-success-50 border border-success-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-success-600 animate-pulse"></div>
              <span className="font-['Geist'] text-[13px] font-medium text-success-700">
                {trialBadge}
              </span>
            </div>
            <button
              onClick={logout}
              className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-brand-600 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Connection Status Banner */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-neutral-200 mb-6 md:mb-8 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-success-50 flex items-center justify-center">
                <FeatherCheck className="text-success-600" size={20} />
              </div>
              <div>
                <p className="font-['Geist'] text-[15px] font-medium text-neutral-900">
                  WhatsApp Connected
                </p>
                <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                  {connectionLabel}
                </p>
              </div>
            </div>
            <Button variant="neutral-secondary" size="small">
              Test Connection
            </Button>
          </div>

          {/* Header */}
          <div className="mb-8 md:mb-12 animate-fade-in delay-100">
            <h1 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[40px] lg:text-[48px] font-[400] leading-[36px] md:leading-[44px] lg:leading-[52px] text-neutral-900 mb-2">
              Welcome back
            </h1>
            <p className="font-['Geist'] text-[16px] md:text-[17px] font-[300] leading-[26px] text-neutral-600">
              Here's what's happening with your bookings
            </p>
          </div>

          {/* Today & Tomorrow Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 md:mb-12 animate-fade-in-up delay-200">
            {/* Today */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                  Today
                </h2>
                <span className="font-['Geist'] text-[13px] font-medium text-neutral-500">
                  {todayBookings.length} booking{todayBookings.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="space-y-4">
                {todayBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="font-['Geist'] text-[16px] font-medium text-neutral-900 min-w-[60px]">
                        {formatTime(booking.booking_time)}
                      </div>
                      <div>
                        <p className="font-['Geist'] text-[15px] font-medium text-neutral-900">
                          {booking.customer_name}
                        </p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                          {booking.party_size} {booking.party_size === 1 ? 'person' : 'people'}
                        </p>
                      </div>
                    </div>
                    <div>
                      {booking.status === 'confirmed' ? (
                        <span className="inline-flex items-center gap-1 bg-success-50 text-success-700 px-3 py-1 rounded-full">
                          <FeatherCheck size={14} />
                          <span className="font-['Geist'] text-[12px] font-medium">Confirmed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full">
                          <span className="font-['Geist'] text-[12px] font-medium">Pending</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200">
                <a href="/dashboard/bookings?filter=today" className="font-['Geist'] text-[14px] font-[400] text-brand-600 hover:underline">
                  View all today's bookings →
                </a>
              </div>
            </div>

            {/* Tomorrow */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                  Tomorrow
                </h2>
                <span className="font-['Geist'] text-[13px] font-medium text-neutral-500">
                  {tomorrowBookings.length} booking{tomorrowBookings.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="space-y-4">
                {tomorrowBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="font-['Geist'] text-[16px] font-medium text-neutral-900 min-w-[60px]">
                        {formatTime(booking.booking_time)}
                      </div>
                      <div>
                        <p className="font-['Geist'] text-[15px] font-medium text-neutral-900">
                          {booking.customer_name}
                        </p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                          {booking.party_size} {booking.party_size === 1 ? 'person' : 'people'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 bg-success-50 text-success-700 px-3 py-1 rounded-full">
                        <FeatherCheck size={14} />
                        <span className="font-['Geist'] text-[12px] font-medium">Confirmed</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200">
                <a href="/dashboard/bookings?filter=tomorrow" className="font-['Geist'] text-[14px] font-[400] text-brand-600 hover:underline">
                  View tomorrow's bookings →
                </a>
              </div>
            </div>
          </div>

          {/* 7-Day Stats */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 mb-8 md:mb-12 animate-fade-in-up delay-300">
            <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-6">
              Last 7 days
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div>
                <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-2">
                  Bookings handled
                </p>
                <p className="font-['Season_Mix_TRIAL'] text-[36px] md:text-[40px] leading-[40px] text-neutral-900">
                  {stats?.bookings ?? 0}
                </p>
              </div>

              <div>
                <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-2">
                  WhatsApp messages
                </p>
                <p className="font-['Season_Mix_TRIAL'] text-[36px] md:text-[40px] leading-[40px] text-neutral-900">
                  {stats?.messages ?? 0}
                </p>
              </div>

              <div>
                <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-2">
                  No-shows prevented
                </p>
                <p className="font-['Season_Mix_TRIAL'] text-[36px] md:text-[40px] leading-[40px] text-neutral-900">
                  {stats?.noShowsPrevented ?? 0}
                </p>
              </div>

              <div>
                <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-2">
                  Money saved
                </p>
                <p className="font-['Season_Mix_TRIAL'] text-[36px] md:text-[40px] leading-[40px] text-success-600">
                  R{(stats?.moneySaved ?? 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 animate-fade-in-up delay-400">
            <h2 className="font-['Season_Mix_TRIAL'] text-[20px] font-[400] text-neutral-900 mb-6">
              Quick actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 border border-neutral-200 hover:border-brand-600 transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-[18px]">✅</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      Reminders
                    </p>
                    <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600 mb-3">
                      {summary.quickActions.remindersEnabled ? "Currently ON" : "Currently OFF"}
                    </p>
                    <p className="font-['Geist'] text-[12px] text-neutral-500">
                      Manage reminder timing in Settings
                    </p>
                  </div>
                </div>
              </div>

              <button className="bg-white rounded-xl p-5 border border-neutral-200 hover:border-brand-600 hover:bg-brand-50 transition-all text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-[18px]">📱</span>
                  </div>
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      Send test message
                    </p>
                    <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                      Test your WhatsApp bot
                    </p>
                  </div>
                </div>
              </button>

              <a href="/dashboard/settings" className="bg-white rounded-xl p-5 border border-neutral-200 hover:border-brand-600 hover:bg-brand-50 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-[18px]">⚙️</span>
                  </div>
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      Settings
                    </p>
                    <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                      Configure alerts & hours
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
