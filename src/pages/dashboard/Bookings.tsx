import React, { useState } from "react";
import { Button } from "@/subframe/components/Button";
import { AnimatedInput } from "@/components/AnimatedInput";
import { FeatherCheck, FeatherX, FeatherCalendar, FeatherUser, FeatherPhone } from "@subframe/core";
import { useAuthContext } from "@/context/AuthContext";

function Bookings() {
  const { logout } = useAuthContext();
  const [activeFilter, setActiveFilter] = useState("today");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Mock bookings data
  const mockBookings = [
    {
      id: 1,
      date: "Nov 14",
      time: "19:00",
      name: "Sarah Chen",
      phone: "+27 82 123 4567",
      people: 4,
      status: "confirmed",
      source: "whatsapp",
      notes: "Birthday dinner, vegetarian option needed",
      created: "2 hours ago"
    },
    {
      id: 2,
      date: "Nov 14",
      time: "20:30",
      name: "Marco Silva",
      phone: "+27 83 456 7890",
      people: 2,
      status: "pending",
      source: "whatsapp",
      notes: "",
      created: "1 hour ago"
    },
    {
      id: 3,
      date: "Nov 14",
      time: "21:00",
      name: "Ahmed Khan",
      phone: "+27 84 789 0123",
      people: 6,
      status: "confirmed",
      source: "whatsapp",
      notes: "Window table requested",
      created: "3 hours ago"
    },
    {
      id: 4,
      date: "Nov 15",
      time: "18:30",
      name: "Nandi Dlamini",
      phone: "+27 85 234 5678",
      people: 5,
      status: "confirmed",
      source: "whatsapp",
      notes: "",
      created: "Yesterday"
    },
  ];

  const filteredBookings = mockBookings; // TODO: Apply filters

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

          {/* Bookings List */}
          <div className="space-y-4 animate-fade-in-up delay-200">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl p-4 md:p-6 border border-neutral-200 hover:border-brand-600 transition-all cursor-pointer"
                onClick={() => setSelectedBooking(booking)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-start md:items-center gap-4 mb-3">
                      <div className="min-w-[80px]">
                        <p className="font-['Geist'] text-[13px] font-medium text-neutral-500">{booking.date}</p>
                        <p className="font-['Season_Mix_TRIAL'] text-[20px] leading-[24px] text-neutral-900">{booking.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-['Geist'] text-[16px] font-medium text-neutral-900">{booking.name}</p>
                        <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                          {booking.people} {booking.people === 1 ? 'person' : 'people'} • {booking.phone}
                        </p>
                        {booking.notes && (
                          <p className="font-['Geist'] text-[13px] font-[300] text-neutral-500 mt-1">
                            Note: {booking.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Source Badge */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                        <span className="text-[12px]">💬</span>
                        <span className="font-['Geist'] text-[11px] font-medium">WhatsApp</span>
                      </span>
                      <span className="font-['Geist'] text-[12px] text-neutral-400">
                        {booking.created}
                      </span>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-end gap-3">
                    {/* Status Badge */}
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

                    {/* Action Buttons */}
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button variant="neutral-secondary" size="small">
                          <FeatherX size={14} className="mr-1" />
                          Decline
                        </Button>
                        <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
                          <Button size="small">
                            <FeatherCheck size={14} className="mr-1" />
                            Confirm
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (when no bookings) */}
          {filteredBookings.length === 0 && (
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
                      <span className="font-['Geist'] text-[15px] text-neutral-900">{selectedBooking.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FeatherPhone size={18} className="text-neutral-400" />
                      <a href={`https://wa.me/${selectedBooking.phone.replace(/\s/g, '')}`} className="font-['Geist'] text-[15px] text-brand-600 hover:underline">
                        {selectedBooking.phone}
                      </a>
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
                        {selectedBooking.date} at {selectedBooking.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-['Geist'] text-[14px] text-neutral-600">Party Size</span>
                      <span className="font-['Geist'] text-[15px] font-medium text-neutral-900">
                        {selectedBooking.people} people
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
                        {selectedBooking.created}
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
