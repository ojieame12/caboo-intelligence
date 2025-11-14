import React, { useMemo } from "react";
import { Button } from "@/subframe/components/Button";
import { AnimatedInput } from "@/components/AnimatedInput";
import { AnimatedTextArea } from "@/components/AnimatedTextArea";
import { FeatherCheck, FeatherAlertCircle, FeatherDownload, FeatherTrash2 } from "@subframe/core";
import { useAuthContext } from "@/context/AuthContext";
import { useSettingsData } from "@/hooks/useSettingsData";

function Settings() {
  const { user, logout } = useAuthContext();
  const {
    connectedNumber,
    alertDestination,
    otherNumber,
    emailNotifications,
    notificationEmail,
    remindersEnabled,
    reminderTiming,
    hours,
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
    setHours,
    saveSettings,
  } = useSettingsData();

  const disableInputs = loading || saving;

  const trialBadge = useMemo(() => {
    const trialEnd = user?.restaurant?.trialEndsAt;
    if (!trialEnd) return "Trial active";
    const diff = Math.ceil((new Date(trialEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `Trial: ${diff} day${diff === 1 ? "" : "s"} left` : "Trial ended";
  }, [user?.restaurant?.trialEndsAt]);

  const handleHourChange = (day: string, field: "open" | "close", value: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const toggleClosed = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], closed: !prev[day].closed },
    }));
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
              <a href="/dashboard/bookings" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
                Bookings
              </a>
              <a href="/dashboard/settings" className="font-['Inter'] text-[14px] font-[500] text-neutral-900">
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
        <div className="max-w-[900px] mx-auto">

          {/* Header */}
          <div className="mb-8 md:mb-12 animate-fade-in">
            <h1 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[40px] font-[400] leading-[36px] md:leading-[44px] text-neutral-900 mb-2">
              Settings & Billing
            </h1>
            <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
              Configure your WhatsApp assistant and manage your subscription
            </p>
          </div>

          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 rounded-2xl p-4 mb-6 flex items-center gap-3">
              <FeatherAlertCircle size={18} />
              <span className="font-['Geist'] text-[14px]">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-success-50 border border-success-200 text-success-700 rounded-2xl p-4 mb-6 flex items-center gap-3">
              <FeatherCheck size={18} />
              <span className="font-['Geist'] text-[14px]">{success}</span>
            </div>
          )}

          <div className="space-y-8">

            {/* Section 1: WhatsApp & Notifications */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 animate-fade-in-up delay-100">
              <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-6">
                WhatsApp & Notifications
              </h2>

              {/* Connected Number */}
              <div className="mb-8">
                <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-4">
                  Restaurant WhatsApp Number
                </p>
                <div className="bg-success-50 border border-success-200 rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success-600 flex items-center justify-center">
                      <FeatherCheck className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-['Geist'] text-[15px] font-medium text-success-900">
                        Connected
                      </p>
                      <p className="font-['Geist'] text-[14px] font-[300] text-success-700">
                        {connectedNumber}
                      </p>
                    </div>
                  </div>
                  <Button variant="neutral-secondary" size="small">
                    Disconnect
                  </Button>
                </div>
              </div>

              {/* Alert Destination */}
              <div className="mb-8">
                <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-4">
                  Where should booking alerts go?
                </p>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-neutral-200 hover:border-brand-600 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="destination"
                      value="same"
                      checked={alertDestination === "same"}
                      onChange={(e) => setAlertDestination(e.target.value)}
                      className="mt-1 accent-brand-600"
                      disabled={disableInputs}
                    />
                    <div>
                      <p className="font-['Geist'] text-[15px] font-medium text-neutral-900">This WhatsApp number</p>
                      <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">Alerts sent to {connectedNumber}</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-neutral-200 hover:border-brand-600 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="destination"
                      value="different"
                      checked={alertDestination === "different"}
                      onChange={(e) => setAlertDestination(e.target.value)}
                      className="mt-1 accent-brand-600"
                      disabled={disableInputs}
                    />
                    <div className="flex-1">
                      <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-3">Different WhatsApp number</p>
                      {alertDestination === "different" && (
                        <AnimatedInput
                          label="Alert number"
                          value={otherNumber}
                          onChange={(e) => setOtherNumber(e.target.value)}
                          placeholder="+27 XX XXX XXXX"
                          disabled={disableInputs}
                        />
                      )}
                    </div>
                  </label>
                </div>

                {/* Email Notifications */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="accent-brand-600 w-5 h-5"
                      disabled={disableInputs}
                    />
                    <span className="font-['Geist'] text-[15px] font-medium text-neutral-900">
                      Also email me booking alerts
                    </span>
                  </label>
                  {emailNotifications && (
                      <AnimatedInput
                        label="Email address"
                        type="email"
                        value={notificationEmail}
                        onChange={(e) => setNotificationEmail(e.target.value)}
                        placeholder="owner@restaurant.com"
                        disabled={disableInputs}
                      />
                  )}
                </div>
              </div>

              {/* Opening Hours */}
              <div>
                <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-4">
                  Opening Hours
                </p>
                <div className="space-y-3">
                  {Object.entries(hours).map(([day, times]) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-12">
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 capitalize">
                          {day}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        {times.closed ? (
                          <span className="font-['Geist'] text-[13px] text-neutral-500">Closed for this day</span>
                        ) : (
                          <>
                            <input
                              type="time"
                              value={times.open}
                              disabled={disableInputs}
                              onChange={(e) => handleHourChange(day, "open", e.target.value)}
                              className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 font-['Geist'] text-[14px] font-medium text-neutral-900"
                            />
                            <span className="font-['Geist'] text-[13px] text-neutral-500">to</span>
                            <input
                              type="time"
                              value={times.close}
                              disabled={disableInputs}
                              onChange={(e) => handleHourChange(day, "close", e.target.value)}
                              className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 font-['Geist'] text-[14px] font-medium text-neutral-900"
                            />
                          </>
                        )}
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={times.closed}
                          onChange={() => toggleClosed(day)}
                          className="accent-brand-600"
                          disabled={disableInputs}
                        />
                        <span className="font-['Geist'] text-[13px] text-neutral-600">Closed</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift max-w-[200px]">
                  <Button size="medium" disabled={disableInputs} onClick={saveSettings}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>

            {/* Section 2: Messages & Reminders */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 animate-fade-in-up delay-200">
              <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-6">
                Messages & Automation
              </h2>

              {/* Reminders Toggle */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      Booking Reminders
                    </p>
                    <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                      Send automatic reminders before bookings
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remindersEnabled}
                      onChange={(e) => setRemindersEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                  </label>
                </div>

                {remindersEnabled && (
                  <div className="bg-neutral-50 rounded-xl p-5 space-y-4">
                    <div>
                      <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-3">
                        Send reminder
                      </p>
                      <div className="flex gap-2">
                        {['3h', '6h', '24h'].map((timing) => (
                          <button
                            key={timing}
                            onClick={() => setReminderTiming(timing)}
                            className={`
                              px-4 py-2 rounded-full font-['Geist'] text-[14px] font-medium transition-all
                              ${reminderTiming === timing
                                ? 'bg-brand-600 text-white'
                                : 'bg-white border border-neutral-200 text-neutral-700 hover:border-brand-600'
                              }
                            `}
                          >
                            {timing === '3h' ? '3 hours before' : timing === '6h' ? '6 hours before' : '24 hours before'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-3">
                        Preview Message
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-neutral-200">
                        <p className="font-['Geist'] text-[14px] text-neutral-800">
                          Hi <span className="bg-brand-100 px-1 rounded">{"{{name}}"}</span>, reminder about your table for{" "}
                          <span className="bg-brand-100 px-1 rounded">{"{{people}}"}</span> today at{" "}
                          <span className="bg-brand-100 px-1 rounded">{"{{time}}"}</span>. Reply 1 to confirm, 2 to cancel.
                        </p>
                      </div>
                      <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500 mt-2">
                        Yellow highlights are variables - they'll be replaced with actual booking details
                      </p>
                    </div>

                    <Button variant="brand-tertiary" size="small">
                      Edit Message Template
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Customer Data & Privacy */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 animate-fade-in-up delay-300">
              <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-6">
                Customer Data & Privacy
              </h2>

              <div className="space-y-6">
                {/* What we store */}
                <div className="bg-neutral-50 rounded-xl p-5">
                  <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-3">
                    Information we store:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 font-['Geist'] text-[14px] text-neutral-700">
                      <FeatherCheck className="text-brand-600" size={16} />
                      Customer names (from booking conversations)
                    </li>
                    <li className="flex items-center gap-2 font-['Geist'] text-[14px] text-neutral-700">
                      <FeatherCheck className="text-brand-600" size={16} />
                      Phone numbers (WhatsApp)
                    </li>
                    <li className="flex items-center gap-2 font-['Geist'] text-[14px] text-neutral-700">
                      <FeatherCheck className="text-brand-600" size={16} />
                      Booking history and preferences
                    </li>
                    <li className="flex items-center gap-2 font-['Geist'] text-[14px] text-neutral-700">
                      <FeatherCheck className="text-brand-600" size={16} />
                      Special requests and dietary notes
                    </li>
                  </ul>

                  <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600 mt-4">
                    <strong>Retention:</strong> Data kept for 12 months after last booking, then automatically deleted.
                  </p>
                </div>

                {/* POPIA Compliance */}
                <div className="bg-brand-50 rounded-xl p-5">
                  <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">
                    POPIA Compliant
                  </p>
                  <p className="font-['Geist'] text-[13px] font-[300] text-neutral-700">
                    We comply with South Africa's Protection of Personal Information Act.
                    Customers can opt-out of reminders anytime. Data is encrypted and securely stored.
                  </p>
                </div>

                {/* Data Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="neutral-secondary" size="medium" className="flex-1">
                    <FeatherDownload size={16} className="mr-2" />
                    Export All Data (CSV)
                  </Button>
                  <Button variant="neutral-secondary" size="medium" className="flex-1">
                    <FeatherTrash2 size={16} className="mr-2" />
                    Delete Customer Data
                  </Button>
                </div>

                <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500">
                  <a href="/privacy" className="text-brand-600 hover:underline">View full Privacy Policy</a>
                </p>
              </div>
            </div>

            {/* Section 4: Billing & Subscription */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 animate-fade-in-up delay-400">
              <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-6">
                Billing & Subscription
              </h2>

              <div className="space-y-6">
                {/* Plan Details */}
                <div className="bg-neutral-50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-['Geist'] text-[16px] font-medium text-neutral-900">
                        Standard Plan
                      </p>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        R599/month • Everything included
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-['Season_Mix_TRIAL'] text-[28px] leading-[28px] text-brand-600">
                        R599
                      </p>
                      <p className="font-['Geist'] text-[13px] text-neutral-500">/month</p>
                    </div>
                  </div>

                  {/* Trial Status */}
                  <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                    <p className="font-['Geist'] text-[14px] font-medium text-success-900 mb-1">
                      Free Trial Active
                    </p>
                    <p className="font-['Geist'] text-[13px] font-[300] text-success-700">
                      12 days remaining • First charge on December 14, 2024
                    </p>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-3">
                    Payment Method
                  </p>
                  <div className="bg-neutral-50 rounded-xl p-5 flex items-center justify-between">
                    <p className="font-['Geist'] text-[14px] text-neutral-700">
                      No card added yet
                    </p>
                    <Button variant="brand-tertiary" size="small">
                      Add Payment Method
                    </Button>
                  </div>
                  <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500 mt-2">
                    You'll be prompted to add a card before your trial ends
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-neutral-200 space-y-3">
                  <Button variant="neutral-secondary" size="medium" className="w-full">
                    <FeatherDownload size={16} className="mr-2" />
                    Download Invoices
                  </Button>
                  <button className="w-full text-center py-3 font-['Geist'] text-[14px] text-error-600 hover:text-error-700 transition-colors">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
