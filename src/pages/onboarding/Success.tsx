import React from "react";
import { Button } from "@/subframe/components/Button";
import { FeatherCheck } from "@subframe/core";

function Success() {
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
            <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
            <div className="w-2 h-2 rounded-full bg-success-600"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-[900px]">
          {/* Success Hero */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 rounded-full bg-success-600 flex items-center justify-center mx-auto mb-8 animate-fade-in">
              <FeatherCheck className="text-white" size={40} />
            </div>
            <h1 className="font-['Season_Mix_TRIAL'] text-[56px] font-[400] leading-[60px] text-neutral-900 mb-6 animate-fade-in delay-100">
              You're live!
            </h1>
            <p className="font-['Geist'] text-[20px] font-[300] leading-[32px] text-neutral-600 max-w-[600px] mx-auto animate-fade-in delay-200">
              Your WhatsApp is now an intelligent booking assistant.
              Customers can start booking right away.
            </p>
          </div>

          {/* Test Guide */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* Left: What to do */}
            <div className="bg-brand-50 rounded-2xl p-10 animate-fade-in-up delay-300">
              <h2 className="font-['Season_Mix_TRIAL'] text-[28px] font-[400] text-neutral-900 mb-6">
                Test it yourself
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">1</span>
                  </div>
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-2">
                      From your phone
                    </p>
                    <p className="font-['Geist'] text-[14px] font-[300] leading-[24px] text-neutral-700">
                      Open WhatsApp and message your restaurant's number
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">2</span>
                  </div>
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-2">
                      Send a test booking
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-neutral-300 font-mono text-[13px] text-neutral-800">
                      "Hi, table for 4 tonight at 7pm"
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">3</span>
                  </div>
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-2">
                      Watch it work
                    </p>
                    <p className="font-['Geist'] text-[14px] font-[300] leading-[24px] text-neutral-700">
                      The bot will respond, collect details, and send you a confirmation request
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: What happens */}
            <div className="bg-white rounded-2xl p-10 border border-neutral-200 animate-fade-in-up delay-400">
              <h2 className="font-['Season_Mix_TRIAL'] text-[28px] font-[400] text-neutral-900 mb-6">
                What's active now
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      Instant booking responses
                    </p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      Bot replies in seconds to all booking requests
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      One-tap confirmations
                    </p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      You get WhatsApp notifications with confirm/decline buttons
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      Automatic reminders
                    </p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      Customers get reminded 3 hours before their booking
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      14-day free trial
                    </p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      Try everything free. No credit card required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trial Info */}
          <div className="bg-neutral-50 rounded-2xl p-8 text-center mb-10 animate-fade-in delay-500">
            <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
              Your 14-day free trial has started
            </p>
            <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
              We'll check in after a few days to see how it's going. No payment needed until day 14.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 animate-fade-in delay-600">
            <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
              <Button size="large" onClick={() => window.location.href = '/dashboard'}>
                Go to dashboard
              </Button>
            </div>
            <Button variant="neutral-secondary" size="large">
              Send test booking
            </Button>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="w-full py-8 px-6 border-t border-neutral-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500">
            Need help? WhatsApp us anytime at support@caboo.design
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Success;
