import React from "react";
import { Button } from "@/subframe/components/Button";
import { FeatherCheck } from "@subframe/core";

function Dashboard() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-default-background">
      {/* Navbar */}
      <div className="w-full border-b border-neutral-border bg-white">
        <div className="flex w-full max-w-[1400px] mx-auto items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <img
              className="h-6 flex-none object-cover"
              src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
              alt="Caboo Logo"
            />
            <nav className="hidden md:flex items-center gap-6">
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
              <div className="w-2 h-2 rounded-full bg-success-600"></div>
              <span className="font-['Geist'] text-[13px] font-medium text-success-700">
                Trial: 14 days left
              </span>
            </div>
            <Button variant="neutral-secondary" size="small">
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="font-['Season_Mix_TRIAL'] text-[48px] font-[400] leading-[52px] text-neutral-900 mb-3">
              Welcome to Caboo
            </h1>
            <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600">
              Your intelligent WhatsApp booking assistant is active and ready.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mb-12 animate-fade-in-up delay-100">
            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-3">
                Bookings today
              </p>
              <p className="font-['Season_Mix_TRIAL'] text-[48px] leading-[48px] text-neutral-900">
                0
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-3">
                This week
              </p>
              <p className="font-['Season_Mix_TRIAL'] text-[48px] leading-[48px] text-neutral-900">
                0
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-3">
                No-shows prevented
              </p>
              <p className="font-['Season_Mix_TRIAL'] text-[48px] leading-[48px] text-neutral-900">
                0
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <p className="font-['Geist'] text-[13px] font-medium text-neutral-500 uppercase tracking-wide mb-3">
                Revenue saved
              </p>
              <p className="font-['Season_Mix_TRIAL'] text-[48px] leading-[48px] text-neutral-900">
                R0
              </p>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-2xl p-16 border border-neutral-200 text-center animate-fade-in-up delay-200">
            <div className="max-w-[600px] mx-auto">
              <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-8">
                <span className="text-[40px]">📱</span>
              </div>

              <h2 className="font-['Season_Mix_TRIAL'] text-[36px] font-[400] leading-[40px] text-neutral-900 mb-6">
                No bookings yet
              </h2>

              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-10">
                Your WhatsApp booking assistant is active and waiting. When customers message
                your WhatsApp to book, you'll see them appear here.
              </p>

              <div className="bg-neutral-50 rounded-xl p-8 mb-10">
                <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-6">
                  Test it right now:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">1</span>
                    </div>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">
                      Open WhatsApp on your phone
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">2</span>
                    </div>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">
                      Message your restaurant's number: "Table for 4 tonight"
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">3</span>
                    </div>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">
                      Watch the bot respond and send you a confirmation request
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="brand-tertiary" size="medium">
                View setup guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
