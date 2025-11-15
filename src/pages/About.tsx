import React from "react";
import { Button } from "@/subframe/components/Button";
import { FeatherCheck, FeatherMessageCircle, FeatherZap, FeatherTrendingUp } from "@subframe/core";

function About() {
  return (
    <div className="flex h-full w-full flex-col items-center bg-default-background">
      {/* Navbar */}
      <div className="w-full border-b border-neutral-border bg-white sticky top-0 z-50">
        <div className="flex w-full max-w-[1280px] mx-auto flex-wrap items-center justify-between gap-4 px-4 md:px-6 py-4">
          <div className="flex h-12 flex-col items-start justify-center gap-2">
            <a href="/">
              <img
                className="h-6 flex-none object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
                alt="Caboo Logo"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8">
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

          <div className="flex items-center gap-4">
            <a href="/signin" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              Sign in
            </a>
            <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
              <Button onClick={() => window.location.href = '/signup'}>
                Start free trial
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="w-full py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-[900px] mx-auto">

          {/* Hero */}
          <div className="text-center mb-16 md:mb-20 animate-fade-in">
            <h1 className="font-['Season_Mix_TRIAL'] text-[40px] md:text-[52px] font-[400] leading-[44px] md:leading-[56px] text-neutral-900 mb-6">
              Building the intelligence layer for customer communication
            </h1>
            <p className="font-['Geist'] text-[18px] md:text-[20px] font-[300] leading-[30px] md:leading-[34px] text-neutral-600 max-w-[700px] mx-auto">
              We help businesses have better conversations with their customers—starting with WhatsApp,
              expanding across channels and industries.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-neutral-200 mb-12 animate-fade-in-up delay-100">
            <h2 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[36px] font-[400] text-neutral-900 mb-6">
              Our mission
            </h2>
            <p className="font-['Geist'] text-[17px] md:text-[18px] font-[300] leading-[30px] text-neutral-600 mb-6">
              Every business communicates with customers. Most do it badly—messages get lost, requests go unanswered,
              customers wait hours for replies. We believe there's a better way.
            </p>
            <p className="font-['Geist'] text-[17px] md:text-[18px] font-[300] leading-[30px] text-neutral-600">
              Caboo is building an <strong>intelligence layer</strong> that sits between businesses and their customers.
              We handle the conversation—understanding requests, collecting information, sending reminders,
              and coordinating everything—so businesses can focus on serving, not messaging.
            </p>
          </div>

          {/* Why We Started */}
          <div className="mb-12 animate-fade-in-up delay-200">
            <h2 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[36px] font-[400] text-neutral-900 mb-8">
              Why we started with restaurants
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                  <FeatherMessageCircle className="text-brand-600" size={24} />
                </div>
                <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                  Clear pain point
                </h3>
                <p className="font-['Geist'] text-[14px] font-[300] leading-[24px] text-neutral-600">
                  Restaurants lose R32,000 monthly to WhatsApp chaos and no-shows.
                  The problem is obvious and measurable.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                  <FeatherZap className="text-brand-600" size={24} />
                </div>
                <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                  Proven solution
                </h3>
                <p className="font-['Geist'] text-[14px] font-[300] leading-[24px] text-neutral-600">
                  Automated confirmations and reminders reduce no-shows by 91%.
                  The ROI is immediate and undeniable.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                  <FeatherTrendingUp className="text-brand-600" size={24} />
                </div>
                <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                  Learning foundation
                </h3>
                <p className="font-['Geist'] text-[14px] font-[300] leading-[24px] text-neutral-600">
                  Every booking conversation teaches our system. We refine weekly,
                  building intelligence that transfers to other industries.
                </p>
              </div>
            </div>
          </div>

          {/* The Vision */}
          <div className="bg-brand-50 rounded-2xl p-8 md:p-12 mb-12 animate-fade-in-up delay-300">
            <h2 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[36px] font-[400] text-neutral-900 mb-6">
              Where we're going
            </h2>

            <p className="font-['Geist'] text-[17px] md:text-[18px] font-[300] leading-[30px] text-neutral-700 mb-8">
              Restaurant bookings are just the beginning. We're building fine-tuned conversation systems
              for every industry where customer communication matters:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                  Salons & Spas
                </h3>
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600 mb-3">
                  Appointment booking, service reminders, rebooking prompts,
                  product recommendations based on history.
                </p>
                <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500">
                  Same conversation engine, different domain expertise
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                  Medical Practices
                </h3>
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600 mb-3">
                  Appointment scheduling, prescription reminders, follow-up care,
                  referral coordination.
                </p>
                <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500">
                  POPIA-compliant health communication
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                  Retail & E-commerce
                </h3>
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600 mb-3">
                  Order tracking, product discovery, customer support,
                  personalized recommendations, receipts via WhatsApp.
                </p>
                <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500">
                  From browsing to purchase to support
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                  Service Businesses
                </h3>
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600 mb-3">
                  Job scheduling, quote requests, service reminders,
                  technician coordination, customer updates.
                </p>
                <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500">
                  Any business with appointments
                </p>
              </div>
            </div>

            <p className="font-['Geist'] text-[15px] font-[300] text-neutral-600 mt-8 italic">
              One platform. Multiple verticals. Fine-tuned conversations that understand
              the specific needs of each industry.
            </p>
          </div>

          {/* How We Build */}
          <div className="mb-12 animate-fade-in-up delay-400">
            <h2 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[36px] font-[400] text-neutral-900 mb-8">
              How we build intelligence
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-['Geist'] text-[17px] font-medium text-neutral-900 mb-2">
                    Start with one vertical
                  </h3>
                  <p className="font-['Geist'] text-[15px] font-[300] leading-[26px] text-neutral-600">
                    Master restaurant bookings completely. Learn every edge case, every customer pattern,
                    every failure mode. Build a conversation system that actually works.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-['Geist'] text-[17px] font-medium text-neutral-900 mb-2">
                    Extract the framework
                  </h3>
                  <p className="font-['Geist'] text-[15px] font-[300] leading-[26px] text-neutral-600">
                    Separate what's universal (booking flow, reminder timing, confirmation logic)
                    from what's specific (restaurant terminology, availability rules).
                    Build reusable components.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-['Geist'] text-[17px] font-medium text-neutral-900 mb-2">
                    Fine-tune for new verticals
                  </h3>
                  <p className="font-['Geist'] text-[15px] font-[300] leading-[26px] text-neutral-600">
                    Deploy the same engine to salons, clinics, gyms. Customize conversation flows,
                    terminology, and business rules. Each vertical teaches the system more.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">4</span>
                </div>
                <div>
                  <h3 className="font-['Geist'] text-[17px] font-medium text-neutral-900 mb-2">
                    Scale the platform
                  </h3>
                  <p className="font-['Geist'] text-[15px] font-[300] leading-[26px] text-neutral-600">
                    10,000 businesses using the same core technology, each with conversations
                    perfectly adapted to their industry. Network effects kick in—every conversation
                    improves the system for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Channel Vision */}
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-neutral-200 mb-12 animate-fade-in-up delay-500">
            <h2 className="font-['Season_Mix_TRIAL'] text-[28px] md:text-[32px] font-[400] text-neutral-900 mb-6">
              Beyond WhatsApp
            </h2>

            <p className="font-['Geist'] text-[16px] md:text-[17px] font-[300] leading-[28px] md:leading-[30px] text-neutral-600 mb-8">
              WhatsApp is our starting point because it's where South African customers already are.
              But our intelligence layer works across any communication channel:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['WhatsApp', 'Instagram DMs', 'Facebook Messenger', 'SMS', 'Email', 'Web Chat', 'Voice Calls', 'Google Business'].map((channel) => (
                <div key={channel} className="bg-neutral-50 rounded-lg p-4 text-center">
                  <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">
                    {channel}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500 mt-6 text-center">
              One conversation engine. Every channel your customers use.
            </p>
          </div>

          {/* Company Info */}
          <div className="mb-12 animate-fade-in-up delay-600">
            <h2 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[36px] font-[400] text-neutral-900 mb-8">
              Company information
            </h2>

            <div className="bg-neutral-50 rounded-2xl p-8 space-y-4">
              <div>
                <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-1">Legal Name</p>
                <p className="font-['Geist'] text-[16px] font-[300] text-neutral-900">Caboo Intelligence (Pty) Ltd</p>
              </div>
              <div>
                <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-1">Registration Number</p>
                <p className="font-['Geist'] text-[16px] font-[300] text-neutral-900">2025/868763/07</p>
              </div>
              <div>
                <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-1">VAT Number</p>
                <p className="font-['Geist'] text-[16px] font-[300] text-neutral-900">9831457198</p>
              </div>
              <div>
                <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-1">Website</p>
                <p className="font-['Geist'] text-[16px] font-[300] text-neutral-900">caboo.design</p>
              </div>
              <div>
                <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-1">Email</p>
                <p className="font-['Geist'] text-[16px] font-[300] text-neutral-900">support@caboo.design</p>
              </div>
              <div>
                <p className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-1">Founded</p>
                <p className="font-['Geist'] text-[16px] font-[300] text-neutral-900">November 2024</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl p-10 md:p-12 border-2 border-brand-600 text-center animate-fade-in-up delay-700">
            <h2 className="font-['Season_Mix_TRIAL'] text-[28px] md:text-[32px] font-[400] text-neutral-900 mb-6">
              Ready to transform customer communication?
            </h2>
            <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-8">
              Join South African restaurants already using intelligent WhatsApp conversations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
                <Button size="large" onClick={() => window.location.href = '/signup'}>
                  Start free trial
                </Button>
              </div>
              <a href="/contact" className="font-['Geist'] text-[16px] font-medium text-neutral-600 hover:text-brand-600 transition-colors">
                Contact us →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 md:py-16 px-4 md:px-6 bg-neutral-700">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            <div className="md:col-span-2">
              <img
                className="h-6 flex-none object-cover mb-4 brightness-0 invert"
                src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
                alt="Caboo Logo"
              />
              <p className="font-['Geist'] text-[14px] font-[300] leading-[22px] text-neutral-300 max-w-[400px]">
                Intelligence layer for customer communication.
                Starting with WhatsApp bookings for restaurants.
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
