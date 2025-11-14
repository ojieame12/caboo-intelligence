import React, { useState } from "react";
import { Button } from "@/subframe/components/Button";
import { TextField } from "@/subframe/components/TextField";
import { RadioGroup } from "@/subframe/components/RadioGroup";
import { FeatherCheck } from "@subframe/core";

function Settings() {
  const [alertDestination, setAlertDestination] = useState("same");
  const [hours, setHours] = useState({
    mon: { open: "17:00", close: "23:00", closed: false },
    tue: { open: "17:00", close: "23:00", closed: false },
    wed: { open: "17:00", close: "23:00", closed: false },
    thu: { open: "17:00", close: "23:00", closed: false },
    fri: { open: "17:00", close: "23:00", closed: false },
    sat: { open: "12:00", close: "23:00", closed: false },
    sun: { open: "12:00", close: "22:00", closed: false },
  });

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-default-background">
      {/* Minimal Header */}
      <div className="w-full border-b border-neutral-border bg-white">
        <div className="flex w-full max-w-[1280px] mx-auto items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img
              className="h-6 flex-none object-cover"
              src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
              alt="Caboo Logo"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
            <div className="w-2 h-2 rounded-full bg-brand-600"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-[700px]">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-['Season_Mix_TRIAL'] text-[52px] font-[400] leading-[56px] text-neutral-900 mb-6">
              Quick setup
            </h1>
            <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 max-w-[600px] mx-auto">
              Just a couple of questions to get your assistant working perfectly.
            </p>
          </div>

          <div className="space-y-10">
            {/* Alert Destination */}
            <div className="bg-white rounded-2xl p-10 border border-neutral-200 animate-fade-in-up delay-100">
              <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-4">
                Where should booking alerts go?
              </h2>
              <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600 mb-6">
                When a booking comes in, we'll send you a notification to confirm or decline.
              </p>

              <div className="space-y-4">
                <label className="flex items-start gap-4 p-5 rounded-xl border-2 border-neutral-200 hover:border-brand-600 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="destination"
                    value="same"
                    checked={alertDestination === "same"}
                    onChange={(e) => setAlertDestination(e.target.value)}
                    className="mt-1 accent-brand-600"
                  />
                  <div className="flex-1">
                    <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-1">
                      This WhatsApp number (recommended)
                    </p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      Alerts come to the same number customers message
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-5 rounded-xl border-2 border-neutral-200 hover:border-brand-600 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="destination"
                    value="different"
                    checked={alertDestination === "different"}
                    onChange={(e) => setAlertDestination(e.target.value)}
                    className="mt-1 accent-brand-600"
                  />
                  <div className="flex-1">
                    <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-1">
                      Different number
                    </p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600 mb-3">
                      Send alerts to manager or team WhatsApp
                    </p>
                    {alertDestination === "different" && (
                      <TextField
                        placeholder="+27 82 123 4567"
                        className="w-full"
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-10 border border-neutral-200 animate-fade-in-up delay-200">
              <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-4">
                When do you accept bookings?
              </h2>
              <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600 mb-6">
                We'll use this to give customers accurate availability information.
              </p>

              <div className="space-y-4">
                {Object.entries(hours).map(([day, times]) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-16">
                      <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 capitalize">
                        {day}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <TextField
                        type="time"
                        value={times.open}
                        className="flex-1"
                        disabled={times.closed}
                      />
                      <span className="font-['Geist'] text-[14px] text-neutral-600">to</span>
                      <TextField
                        type="time"
                        value={times.close}
                        className="flex-1"
                        disabled={times.closed}
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={times.closed}
                        className="accent-brand-600"
                      />
                      <span className="font-['Geist'] text-[13px] text-neutral-600">Closed</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <button className="font-['Geist'] text-[14px] text-brand-600 hover:underline">
                  Use same hours for all days
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center animate-fade-in delay-300">
            <div className="flex items-center gap-4 rounded-full bg-brand-600 px-3 py-2 max-w-[300px] mx-auto mb-4 btn-hover-lift">
              <Button size="large" className="w-full" onClick={() => window.location.href = '/onboarding/success'}>
                Finish setup
              </Button>
            </div>
            <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500">
              You can change these settings anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
