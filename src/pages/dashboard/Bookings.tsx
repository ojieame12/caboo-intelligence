import React, { useMemo, useState } from "react";
import { Button } from "@/subframe/components/Button";
import { AnimatedInput } from "@/components/AnimatedInput";
import { FeatherCheck, FeatherX, FeatherCalendar, FeatherUser, FeatherPhone } from "@subframe/core";
import { useAuthContext } from "@/context/AuthContext";
import { useBookings } from "@/hooks/useBookings";

type Booking = {
  id: string;
  customer_name: string;
  customer_phone: string | null;
  party_size: number;
  status: string;
  source: string;
  notes: string | null;
  booking_time: string;
  created_at: string;
};

function Bookings() {
  const { logout } = useAuthContext();
  const [activeFilter, setActiveFilter] = useState("today");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { bookings, loading, error, updateStatus } = useBookings(activeFilter, search);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const formatterDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-ZA", {
        month: "short",
        day: "numeric",
      }),
    [],
  );

  const formatterTime = useMemo(
    () =>
      new Intl.DateTimeFormat("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    [],
  );

  const relativeFormatter = useMemo(() => new Intl.RelativeTimeFormat("en", { numeric: "auto" }), []);

  const formatRelative = (iso: string) => {
    const now = Date.now();
    const date = new Date(iso).getTime();
    const diff = date - now;
    const minutes = Math.round(diff / (1000 * 60));
    if (Math.abs(minutes) < 60) {
      return relativeFormatter.format(minutes, "minute");
    }
    const hours = Math.round(minutes / 60);
    if (Math.abs(hours) < 24) {
      return relativeFormatter.format(hours, "hour");
    }
    const days = Math.round(hours / 24);
    return relativeFormatter.format(days, "day");
  };

  const renderLoading = (
    <div className="bg-white rounded-2xl p-8 border border-neutral-200 text-center text-neutral-500">
      Loading bookings...
    </div>
  );

  const renderError = (error || actionError) && (
    <div className="bg-error-50 rounded-2xl p-6 border border-error-200 text-error-700">
      {error || actionError}
    </div>
  );

  const handleStatusUpdate = async (booking: Booking, status: "confirmed" | "cancelled") => {
    setActioningId(booking.id);
    setActionError(null);
    try {
      const updated = await updateStatus(booking.id, status);
      setSelectedBooking((prev) => (prev && prev.id === booking.id ? { ...prev, status: updated.status } : prev));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setActioningId(null);
    }
  };

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
            <nav className="hidden md:flex items-center gap-4 md:gap-6">
              <a href="/dashboard" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
                Overview
              </a>
              <a href="/dashboard/bookings" className="font-['Inter'] text-[14px] font-[500] text-neutral-900">
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
                Trial: 12 days left
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

          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[40px] font-[400] leading-[36px] md:leading-[44px] text-neutral-900 mb-2">
              Bookings
            </h1>
            <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
              Manage your WhatsApp bookings in one place
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-neutral-200 mb-6 animate-fade-in-up delay-100">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              {/* Date Filters */}
              <div className="flex flex-wrap gap-2">
                {['today', 'tomorrow', 'week'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      px-4 py-2 rounded-full font-['Geist'] text-[14px] font-medium transition-all
                      ${activeFilter === filter
                        ? 'bg-brand-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }
                    `}
                  >
                    {filter === 'today' ? 'Today' : filter === 'tomorrow' ? 'Tomorrow' : 'This Week'}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="w-full md:w-64">
                <AnimatedInput
                  label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Name or phone..."
                />
              </div>
            </div>
          </div>

          {!loading && bookings.length > 0 && (
            <div className="space-y-4 animate-fade-in-up delay-200">
              {bookings.map((booking) => {
                const bookingDate = new Date(booking.booking_time);
                const dateLabel = formatterDate.format(bookingDate);
                const timeLabel = formatterTime.format(bookingDate);
                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl p-4 md:p-6 border border-neutral-200 hover:border-brand-600 transition-all cursor-pointer"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start md:items-center gap-4 mb-3">
                          <div className="min-w-[80px]">
                            <p className="font-['Geist'] text-[13px] font-medium text-neutral-500">{dateLabel}</p>
                            <p className="font-['Season_Mix_TRIAL'] text-[20px] leading-[24px] text-neutral-900">{timeLabel}</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-['Geist'] text-[16px] font-medium text-neutral-900">{booking.customer_name}</p>
                            <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                              {booking.party_size} {booking.party_size === 1 ? 'person' : 'people'} • {booking.customer_phone || 'No phone'}
                            </p>
                            {booking.notes && (
                              <p className="font-['Geist'] text-[13px] font-[300] text-neutral-500 mt-1">
                                Note: {booking.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                            <span className="text-[12px]">💬</span>
                            <span className="font-['Geist'] text-[11px] font-medium">{booking.source}</span>
                          </span>
                          <span className="font-['Geist'] text-[12px] text-neutral-400">
                            {formatRelative(booking.created_at)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        {booking.status === 'confirmed' ? (
                          <span className="inline-flex items-center gap-1.5 bg-success-50 text-success-700 px-4 py-2 rounded-full">
                            <FeatherCheck size={16} />
                            <span className="font-['Geist'] text-[13px] font-medium">Confirmed</span>
                          </span>
                        ) : booking.status === 'pending' ? (
                          <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-700 px-4 py-2 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-neutral-400"></div>
                            <span className="font-['Geist'] text-[13px] font-medium">Pending</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-error-50 text-error-700 px-4 py-2 rounded-full">
                            <FeatherX size={16} />
                            <span className="font-['Geist'] text-[13px] font-medium">Cancelled</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {!loading && bookings.length === 0 && (
            <div className="bg-white rounded-2xl p-12 md:p-16 border border-neutral-200 text-center">
              <div className="max-w-[400px] mx-auto">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
                  <FeatherCalendar className="text-neutral-400" size={32} />
                </div>
                <h3 className="font-['Season_Mix_TRIAL'] text-[28px] font-[400] text-neutral-900 mb-4">
                  No bookings found
                </h3>
                <p className="font-['Geist'] text-[15px] font-[300] text-neutral-600">
                  Try adjusting your filters or check back later
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Side Panel */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 animate-fade-in" onClick={() => setSelectedBooking(null)}>
          <div
            className="absolute right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-['Season_Mix_TRIAL'] text-[28px] font-[400] text-neutral-900">
                  Booking Details
                </h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <FeatherX size={18} className="text-neutral-600" />
                </button>
              </div>

              {/* Booking Info */}
              <div className="space-y-6">
                <div>
                  <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-2">
                    Guest Information
                  </p>
                  <div className="bg-neutral-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <FeatherUser size={18} className="text-neutral-400" />
                      <span className="font-['Geist'] text-[15px] text-neutral-900">{selectedBooking.customer_name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FeatherPhone size={18} className="text-neutral-400" />
                      {selectedBooking.customer_phone ? (
                        <a
                          href={`https://wa.me/${selectedBooking.customer_phone.replace(/\s/g, '')}`}
                          className="font-['Geist'] text-[15px] text-brand-600 hover:underline"
                        >
                          {selectedBooking.customer_phone}
                        </a>
                      ) : (
                        <span className="font-['Geist'] text-[15px] text-neutral-500">No phone provided</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-2">
                    Booking Details
                  </p>
                  <div className="bg-neutral-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-['Geist'] text-[14px] text-neutral-600">Date & Time</span>
                      <span className="font-['Geist'] text-[15px] font-medium text-neutral-900">
                        {formatterDate.format(new Date(selectedBooking.booking_time))} at {formatterTime.format(new Date(selectedBooking.booking_time))}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-['Geist'] text-[14px] text-neutral-600">Party Size</span>
                      <span className="font-['Geist'] text-[15px] font-medium text-neutral-900">
                        {selectedBooking.party_size} {selectedBooking.party_size === 1 ? 'person' : 'people'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-['Geist'] text-[14px] text-neutral-600">Source</span>
                      <span className="font-['Geist'] text-[15px] font-medium text-neutral-900">
                        WhatsApp
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-['Geist'] text-[14px] text-neutral-600">Created</span>
                      <span className="font-['Geist'] text-[15px] font-medium text-neutral-900">
                        {formatRelative(selectedBooking.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div>
                    <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-2">
                      Special Requests
                    </p>
                    <div className="bg-neutral-50 rounded-xl p-4">
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">
                        {selectedBooking.notes}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-2">
                    Status
                  </p>
                  {selectedBooking.status === 'confirmed' ? (
                    <div className="bg-success-50 rounded-xl p-4 flex items-center gap-3">
                      <FeatherCheck className="text-success-600" size={20} />
                      <div>
                        <p className="font-['Geist'] text-[15px] font-medium text-success-900">Confirmed</p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-success-700">
                          Customer received confirmation
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-neutral-100 rounded-xl p-4">
                      <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-2">Awaiting confirmation</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="neutral-secondary" size="small" className="flex-1">
                          Decline
                        </Button>
                        <div className="flex-1 flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
                          <Button size="small" className="w-full">
                            Confirm Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-neutral-200 space-y-3">
                <Button variant="neutral-secondary" size="medium" className="w-full">
                  Resend Confirmation
                </Button>
                <Button variant="neutral-secondary" size="medium" className="w-full">
                  Cancel Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
