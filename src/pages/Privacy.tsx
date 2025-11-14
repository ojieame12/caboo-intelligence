import React from "react";
import { Button } from "@/subframe/components/Button";

function Privacy() {
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

      {/* Privacy Policy Content */}
      <div className="w-full py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-['Season_Mix_TRIAL'] text-[56px] font-[400] leading-[60px] text-neutral-900 mb-4">
            Privacy Policy
          </h1>
          <p className="font-['Geist'] text-[16px] text-neutral-500 mb-16">
            Last updated: October 29, 2024
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Introduction
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                Caboo Intelligence (Pty) Ltd ("Caboo", "we", "us", or "our") operates the Caboo WhatsApp booking automation service. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                By using Caboo, you agree to the collection and use of information in accordance with this policy and South Africa's Protection of Personal Information Act (POPIA).
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Information we collect
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-3">
                    Information you provide
                  </h3>
                  <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-3">
                    When you sign up for Caboo, we collect:
                  </p>
                  <ul className="space-y-2 pl-6">
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Restaurant name and business details</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Contact information (email, phone, WhatsApp number)</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• WhatsApp Business account information</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Business registration details</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-3">
                    Customer booking information
                  </h3>
                  <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-3">
                    Through the booking process, we process:
                  </p>
                  <ul className="space-y-2 pl-6">
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Customer names</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Customer phone numbers</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Booking details (date, time, party size)</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Special requests or dietary requirements</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• WhatsApp message content related to bookings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-3">
                    Automatically collected information
                  </h3>
                  <ul className="space-y-2 pl-6">
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Usage data and analytics</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Device information</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• IP addresses</li>
                    <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Conversation timestamps and metadata</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                How we use your information
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                We use collected information for:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Providing and maintaining the booking automation service</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Processing and confirming customer bookings</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Sending automated reminders to customers</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Notifying restaurants of booking requests</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Improving our service and user experience</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Analyzing booking patterns and generating insights</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Communicating with you about the service</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                WhatsApp data processing
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                Our service integrates with WhatsApp Business API. Messages sent through WhatsApp are subject to both our Privacy Policy and Meta's (Facebook's) Privacy Policy and Terms of Service.
              </p>
              <ul className="space-y-2 pl-6">
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• We only process WhatsApp messages necessary for booking operations</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Messages are processed through Meta's infrastructure</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• We do not sell or share WhatsApp message content with third parties for marketing</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Conversation data is stored securely on our servers</li>
              </ul>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Data sharing and disclosure
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                We may share your information with:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• <strong>WhatsApp/Meta:</strong> To enable WhatsApp messaging functionality</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• <strong>Service Providers:</strong> Cloud hosting, analytics, and support tools</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• <strong>Legal Requirements:</strong> When required by law or to protect rights</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• <strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
              </ul>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mt-6">
                We do NOT sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Data security
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                We implement appropriate technical and organizational measures to protect your data:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Encryption of data in transit and at rest</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Secure authentication and access controls</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Regular security assessments</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Limited employee access to personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Your rights under POPIA
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                Under South Africa's Protection of Personal Information Act, you have the right to:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Access your personal information</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Correct inaccurate information</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Request deletion of your data</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Object to data processing</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Withdraw consent</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Lodge a complaint with the Information Regulator</li>
              </ul>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mt-6">
                To exercise these rights, contact us at <a href="mailto:support@caboo.design" className="text-brand-600 hover:underline">support@caboo.design</a>
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Data retention
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-4">
                We retain your information for as long as necessary to provide our services:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Active account data: Duration of service use</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Booking records: 12 months after booking date</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Financial records: 5 years (as required by law)</li>
                <li className="font-['Geist'] text-[16px] font-[300] text-neutral-600">• Anonymized analytics: Indefinitely</li>
              </ul>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Contact us
              </h2>
              <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-6">
                If you have questions about this Privacy Policy:
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

export default Privacy;
