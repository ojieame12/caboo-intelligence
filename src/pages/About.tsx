import React from "react";
import { Button } from "@/subframe/components/Button";

function About() {
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

      {/* About Content */}
      <div className="w-full py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-['Season_Mix_TRIAL'] text-[56px] font-[400] leading-[60px] text-neutral-900 mb-16 text-center">
            About Caboo
          </h1>

          <div className="space-y-16">
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Our mission
              </h2>
              <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600">
                We help South African restaurants turn WhatsApp chaos into organized bookings.
                No more missed requests. No more no-shows. Just effortless booking management through
                the platform your customers already use.
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Why we built Caboo
              </h2>
              <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 mb-6">
                Every restaurant in South Africa faces the same challenge: booking requests flood in via WhatsApp,
                messages get buried during service, and tables no-show without reminders. The average restaurant
                loses R32,000 monthly to preventable failures.
              </p>
              <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600">
                We built Caboo to solve this—without forcing restaurants to change phone numbers, adopt new
                systems, or train staff on complicated software.
              </p>
            </section>

            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Company information
              </h2>
              <div className="bg-neutral-50 rounded-2xl p-8 space-y-3">
                <p className="font-['Geist'] text-[16px] text-neutral-700"><strong>Legal name:</strong> Caboo Intelligence (Pty) Ltd</p>
                <p className="font-['Geist'] text-[16px] text-neutral-700"><strong>Registration:</strong> 2025/868763/07</p>
                <p className="font-['Geist'] text-[16px] text-neutral-700"><strong>VAT:</strong> 9831457198</p>
                <p className="font-['Geist'] text-[16px] text-neutral-700"><strong>Website:</strong> caboo.design</p>
                <p className="font-['Geist'] text-[16px] text-neutral-700"><strong>Email:</strong> support@caboo.design</p>
              </div>
            </section>

            <section className="bg-brand-50 rounded-2xl p-12 text-center">
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Ready to get started?
              </h2>
              <p className="font-['Geist'] text-[18px] font-[300] text-neutral-600 mb-8">
                See why restaurants trust Caboo for WhatsApp bookings
              </p>
              <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 max-w-[250px] mx-auto">
                <Button onClick={() => window.location.href = '/#pricing'}>
                  Start free trial
                </Button>
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

export default About;
