import React from "react";
import { Button } from "@/subframe/components/Button";
import { FeatherCheck } from "@subframe/core";

function Connect() {
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
            <div className="w-2 h-2 rounded-full bg-brand-600"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-[700px]">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-['Season_Mix_TRIAL'] text-[52px] font-[400] leading-[56px] text-neutral-900 mb-6">
              Connect your WhatsApp
            </h1>
            <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 max-w-[600px] mx-auto">
              We'll connect to your existing WhatsApp Business number—the one your customers
              already use. No new phone needed.
            </p>
          </div>

          {/* What Happens Section */}
          <div className="bg-neutral-50 rounded-2xl p-10 mb-10 animate-fade-in-up delay-200">
            <h2 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-8 text-center">
              What happens next
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">1</span>
                </div>
                <div>
                  <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                    Facebook login
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] leading-[24px] text-neutral-600">
                    A window will open asking you to log in with the Facebook account connected
                    to your WhatsApp Business.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">2</span>
                </div>
                <div>
                  <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                    Select your business
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] leading-[24px] text-neutral-600">
                    Choose your restaurant's business and confirm your WhatsApp Business number.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">3</span>
                </div>
                <div>
                  <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                    Authorize permissions
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] leading-[24px] text-neutral-600">
                    Allow Caboo to send and receive messages on your behalf. This lets the bot work automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-success-600 flex items-center justify-center flex-shrink-0">
                  <FeatherCheck className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                    You're connected
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] leading-[24px] text-neutral-600">
                    Window closes. Your WhatsApp is now intelligent. Takes about 2 minutes total.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reassurance */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-10 animate-fade-in-up delay-300">
            <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-4">
              What stays the same:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0" size={18} />
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  Your WhatsApp number (customers see the same number)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0" size={18} />
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  Your WhatsApp Business app (you can still use it normally)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0" size={18} />
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  Your control (you can reply manually anytime)
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in delay-400">
            <div className="flex items-center gap-4 rounded-full bg-brand-600 px-3 py-2 max-w-[400px] mx-auto mb-6 btn-hover-lift">
              <Button size="large" className="w-full" onClick={() => window.location.href = '/onboarding/processing'}>
                Connect with WhatsApp
              </Button>
            </div>
            <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500">
              Secure connection via Meta • Takes about 2 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="w-full py-8 px-6 border-t border-neutral-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500">
            Secure connection powered by Meta
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Connect;
