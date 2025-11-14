import React from "react";
import { Button } from "@/subframe/components/Button";
import { FeatherCheck, FeatherMail, FeatherMessageCircle } from "@subframe/core";

function BetaWaitlist() {
  // In production, get from auth context or URL param
  const waitlistPosition = 12;
  const userEmail = "owner@restaurant.com";

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-default-background">
      {/* Minimal Navbar */}
      <div className="w-full border-b border-neutral-border bg-white">
        <div className="flex w-full max-w-[1280px] mx-auto items-center justify-between px-4 md:px-6 py-4">
          <a href="/" className="flex h-12 flex-col items-start justify-center gap-2">
            <img
              className="h-6 flex-none object-cover"
              src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
              alt="Caboo Logo"
            />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-16 px-4 md:px-6">
        <div className="w-full max-w-[700px]">

          {/* Success Animation */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-success-600 flex items-center justify-center mx-auto mb-8">
              <FeatherCheck className="text-white" size={40} />
            </div>

            <h1 className="font-['Season_Mix_TRIAL'] text-[40px] md:text-[48px] font-[400] leading-[44px] md:leading-[52px] text-neutral-900 mb-4">
              Welcome to Caboo Beta!
            </h1>

            <p className="font-['Geist'] text-[18px] md:text-[20px] font-[300] leading-[30px] md:leading-[32px] text-neutral-600 mb-2">
              Your account is created and you're in the queue.
            </p>

            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-6 py-3 mt-4">
              <span className="font-['Geist'] text-[16px] font-medium text-brand-900">
                Position #{waitlistPosition} on waitlist
              </span>
            </div>
          </div>

          {/* What's Happening */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 mb-8 animate-fade-in-up delay-200">
            <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-6">
              What's happening now
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <FeatherCheck className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                    Your account is ready
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                    We've created your Caboo account and reserved your spot.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                    WhatsApp Business API approval pending
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                    We're completing final verification with Meta. This typically takes 1-2 weeks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                  <span className="font-['Geist'] text-[14px] font-medium text-neutral-600">3</span>
                </div>
                <div>
                  <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                    You'll be notified immediately
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                    When approved, we'll email <span className="font-medium">{userEmail}</span> with next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What You Can Do Now */}
          <div className="bg-neutral-50 rounded-2xl p-8 md:p-10 mb-8 animate-fade-in-up delay-300">
            <h2 className="font-['Season_Mix_TRIAL'] text-[20px] font-[400] text-neutral-900 mb-6">
              While you wait
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://chat.whatsapp.com/beta-group"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-5 border border-neutral-200 hover:border-brand-600 hover:bg-brand-50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <FeatherMessageCircle className="text-brand-600 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      Join Beta WhatsApp Group
                    </p>
                    <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                      Chat with other beta restaurants
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="/dashboard"
                className="bg-white rounded-xl p-5 border border-neutral-200 hover:border-brand-600 hover:bg-brand-50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[20px] flex-shrink-0">👀</span>
                  <div>
                    <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-1">
                      Preview Dashboard
                    </p>
                    <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                      See what's coming
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 animate-fade-in-up delay-400">
            <h2 className="font-['Season_Mix_TRIAL'] text-[20px] font-[400] text-neutral-900 mb-6">
              Common questions
            </h2>

            <div className="space-y-5">
              <div>
                <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-2">
                  How long does approval take?
                </p>
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  Typically 1-2 weeks. We're working with Meta to get approved as quickly as possible.
                </p>
              </div>

              <div>
                <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-2">
                  Will I lose my spot?
                </p>
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  No! Your account is reserved. We'll process waitlist in order—you're locked in.
                </p>
              </div>

              <div>
                <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-2">
                  Can I start using it now?
                </p>
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  Not yet. WhatsApp requires business verification before we can activate your bot.
                  Once approved, setup takes 5 minutes.
                </p>
              </div>

              <div>
                <p className="font-['Geist'] text-[15px] font-medium text-neutral-900 mb-2">
                  What if I have questions?
                </p>
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  Email us at <a href="mailto:support@caboo.design" className="text-brand-600 hover:underline">support@caboo.design</a> or
                  join the beta WhatsApp group above.
                </p>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-8 animate-fade-in delay-500">
            <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500 mb-4">
              Want updates on approval status?
            </p>
            <a
              href="mailto:support@caboo.design?subject=Beta Waitlist Status"
              className="inline-flex items-center gap-2 font-['Geist'] text-[15px] font-medium text-brand-600 hover:underline"
            >
              <FeatherMail size={16} />
              Email us for updates
            </a>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="w-full py-8 px-4 md:px-6 border-t border-neutral-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500">
            © 2025 Caboo Intelligence (Pty) Ltd
          </p>
        </div>
      </footer>
    </div>
  );
}

export default BetaWaitlist;
