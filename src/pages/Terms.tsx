import React from "react";
import { Button } from "@/subframe/components/Button";

function Terms() {
  return (
    <div className="flex h-full w-full flex-col items-center bg-default-background">
      {/* Navbar */}
      <div className="w-full border-b border-neutral-border bg-white sticky top-0 z-50">
        <div className="flex w-full max-w-[1280px] mx-auto flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex h-12 flex-col items-start justify-center gap-2">
            <a href="/">
              <img
                className="h-6 flex-none object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
                alt="Caboo Logo"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="/#what-is-caboo" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              How It Works
            </a>
            <a href="/#pricing" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              Pricing
            </a>
            <a href="/#faq" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a href="/privacy" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              Privacy
            </a>
            <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1">
              <Button onClick={() => window.location.href = '/#pricing'}>
                Start for free
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="w-full py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-['Season_Mix_TRIAL'] text-[56px] font-[400] leading-[60px] text-neutral-900 mb-4">
            Terms of Service
          </h1>
          <p className="font-['Geist'] text-[16px] text-neutral-500 mb-16">
            Last updated: October 29, 2024
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Agreement to Terms
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                By accessing and using Caboo's WhatsApp booking automation service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Description of Service
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                Caboo provides automated WhatsApp booking management services including:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Automated collection of booking requests via WhatsApp</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Booking confirmation and reminder messages</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Integration with your WhatsApp Business account</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Analytics and booking insights</li>
              </ul>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Eligibility
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                You must be a registered business entity in South Africa or authorized to represent such entity. You must be at least 18 years old and have legal authority to enter into these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Subscription and Payment
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-3">
                    Pricing
                  </h3>
                  <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                    The Service is offered at R599 per month. Pricing is subject to change with 30 days' notice.
                  </p>
                </div>

                <div>
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-3">
                    Free Trial
                  </h3>
                  <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                    New customers receive a 14-day free trial. No credit card is required for the trial. After the trial, you will be charged unless you cancel.
                  </p>
                </div>

                <div>
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-3">
                    Billing
                  </h3>
                  <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                    Subscription fees are billed monthly in advance. Payment is due immediately upon billing.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                WhatsApp Integration
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                You must have a verified WhatsApp Business account and provide necessary permissions for Caboo to access and use your WhatsApp number for booking automation.
              </p>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                You agree to comply with WhatsApp's Business Terms of Service and Commerce Policy. Violations may result in WhatsApp suspending your account, for which Caboo is not liable.
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Acceptable Use
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                You agree NOT to use the Service to:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Send spam or unsolicited marketing messages</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Violate any applicable laws or regulations</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Infringe on intellectual property rights</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Transmit harmful code or malware</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Interfere with the Service's operation</li>
              </ul>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Limitation of Liability
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Caboo is not liable for lost profits, revenue, data, or indirect damages</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Our total liability is limited to the amount you paid in the past 12 months</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• We are not responsible for third-party services (WhatsApp/Meta)</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• We are not liable for customer no-shows or booking disputes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Cancellation
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. No refunds for partial months.
              </p>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                We may suspend or terminate your account for violation of these Terms, non-payment, or other reasonable cause with notice.
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Governing Law
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                These Terms are governed by the laws of South Africa. Any disputes will be resolved in the courts of South Africa.
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Contact
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-6">
                For questions about these Terms:
              </p>
              <div className="bg-neutral-50 rounded-2xl p-8 space-y-2">
                <p className="font-['Geist'] text-[16px] font-medium text-neutral-900">Caboo Intelligence (Pty) Ltd</p>
                <p className="font-['Geist'] text-[16px] font-[300] text-neutral-700">Registration: 2025/868763/07</p>
                <p className="font-['Geist'] text-[16px] font-[300] text-neutral-700">Email: <a href="mailto:support@caboo.design" className="text-brand-600 hover:underline">support@caboo.design</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-16 px-6 bg-neutral-700">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <img
                className="h-6 flex-none object-cover mb-4 brightness-0 invert"
                src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
                alt="Caboo Logo"
              />
              <p className="font-['Geist'] text-[14px] font-[300] leading-[22px] text-neutral-300 max-w-[400px]">
                Automated WhatsApp booking management for South African restaurants.
                Never miss a booking. Cut no-shows by 91%.
              </p>
            </div>

            <div>
              <h3 className="font-['Geist'] text-[14px] font-medium text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="/#what-is-caboo" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">How It Works</a></li>
                <li><a href="/#pricing" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">Pricing</a></li>
                <li><a href="/#faq" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-['Geist'] text-[14px] font-medium text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">About</a></li>
                <li><a href="/contact" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">Contact</a></li>
                <li><a href="/privacy" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">Privacy Policy</a></li>
                <li><a href="/terms" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-600">
            <p className="font-['Geist'] text-[14px] font-[300] text-neutral-400 text-center mb-2">
              © 2025 Caboo Intelligence (Pty) Ltd • Registration: 2025/868763/07
            </p>
            <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500 text-center">
              Not affiliated with WhatsApp or Meta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Terms;
