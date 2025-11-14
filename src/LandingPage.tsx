import React from "react";
import { Button } from "@/subframe/components/Button";
import { Accordion } from "@/subframe/components/Accordion";
import { FeatherCheck, FeatherArrowRight } from "@subframe/core";
import { AnimatedSection, CountUp } from "./components/AnimatedSection";
import { useAuthContext } from "./context/AuthContext";

function LandingPage() {
  const { user, logout } = useAuthContext();

  return (
    <div className="flex h-full w-full flex-col items-center bg-default-background">
      {/* Navbar */}
      <div className="w-full border-b border-neutral-border bg-white sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="flex w-full max-w-[1280px] mx-auto items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="/" className="flex h-12 flex-col items-start justify-center gap-2">
            <img
              className="h-6 flex-none object-cover"
              src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
              alt="Caboo Logo"
            />
          </a>

          {/* Center Nav - Desktop Only */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#what-is-caboo" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <a
                  href="/dashboard"
                  className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Dashboard
                </a>
                <button
                  onClick={logout}
                  className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-brand-600 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <a
                href="/signin"
                className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Sign in
              </a>
            )}
            <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
              <Button onClick={() => window.location.href = '/signup'}>
                Start free trial
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full px-6 py-6">
        <div className="flex h-144 w-full flex-none flex-col items-center justify-center gap-8 rounded-2xl px-6 py-2 bg-[#FCF6EF] bg-[url('https://res.cloudinary.com/subframe/image/upload/v1763068410/uploads/13740/bhhmezdkrjimc9edtafq.png')] bg-[right_9rem_top_-9rem] bg-[length:600px] bg-no-repeat">
          <div className="flex w-full max-w-[1280px] flex-col items-start gap-6">
            <h1 className="whitespace-pre-wrap font-['Season_Mix_TRIAL'] text-[56px] font-[400] leading-[60px] text-neutral-900 animate-fade-in">
              {"Your "}
              <span className="text-[#128C7E]">WhatsApp</span>
              {".\nSmarter bookings.\nHappier customers."}
            </h1>
            <p className="max-w-[600px] font-['Geist'] text-[20px] font-[300] leading-[32px] tracking-wide text-neutral-600 animate-fade-in delay-200">
              Automated WhatsApp booking assistant for South African restaurants.
              Never miss a request. Cut no-shows by 91%. Keep your existing number.
            </p>
          </div>
          <div className="flex w-full max-w-[1280px] flex-wrap items-center gap-4 animate-fade-in delay-400">
            <div className="flex items-center gap-4 rounded-full bg-brand-600 px-3 py-2 btn-hover-lift">
              <Button size="large" onClick={() => window.location.href = '/signup'}>
                Start free 14-day trial
              </Button>
            </div>
            <span className="font-['Geist'] text-[14px] text-neutral-500">
              No credit card required • Setup takes 5 minutes
            </span>
          </div>
        </div>
      </div>

      {/* What Caboo Does */}
      <AnimatedSection>
        <div id="what-is-caboo" className="w-full py-32 px-6 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-['Season_Mix_TRIAL'] text-[48px] font-[400] leading-[52px] text-neutral-900 mb-6">
                What Caboo does for your restaurant
              </h2>
              <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 max-w-[700px] mx-auto">
                We make your WhatsApp work like a professional booking system—without changing
                your phone number, adding new apps, or training your staff.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-16">
              <div className="opacity-0 animate-fade-in-up delay-100">
                <h3 className="font-['Season_Mix_TRIAL'] text-[28px] leading-[32px] text-neutral-900 mb-4">
                  Captures every booking
                </h3>
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Bot responds in seconds. Customers get instant replies.
                  You get organized booking details.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up delay-200">
                <h3 className="font-['Season_Mix_TRIAL'] text-[28px] leading-[32px] text-neutral-900 mb-4">
                  One-tap confirmations
                </h3>
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  WhatsApp notification with booking details.
                  Tap Confirm or Decline. Customer gets instant confirmation.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up delay-300">
                <h3 className="font-['Season_Mix_TRIAL'] text-[28px] leading-[32px] text-neutral-900 mb-4">
                  Automatic reminders
                </h3>
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Customers get reminded before their booking.
                  Easy to confirm or cancel. No-shows drop to almost zero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* See It In Action */}
      <div className="w-full py-32 px-6 bg-neutral-50">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-['Season_Mix_TRIAL'] text-[48px] font-[400] leading-[52px] text-neutral-900 mb-6">
              See how it works in practice
            </h2>
            <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 max-w-[700px] mx-auto">
              Here's what actually happens when a customer wants to book a table.
              Everything runs through your existing WhatsApp number.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-12 items-start">
            {/* Booking Conversation */}
            <div className="flex flex-col items-center opacity-0 animate-fade-in-up delay-100">
              <h3 className="font-['Season_Mix_TRIAL'] text-[24px] text-neutral-900 mb-6 text-center h-20 flex items-center">
                Customer books a table
              </h3>
              <img
                src="/mockup-conversation.png"
                alt="WhatsApp booking conversation"
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
              <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500 mt-6 text-center max-w-[280px]">
                Bot asks for party size and time naturally. Quick reply buttons make it easy.
              </p>
            </div>

            {/* Confirmation Flow */}
            <div className="flex flex-col items-center opacity-0 animate-fade-in-up delay-200">
              <h3 className="font-['Season_Mix_TRIAL'] text-[24px] text-neutral-900 mb-6 text-center h-20 flex items-center">
                You confirm with one tap
              </h3>
              <img
                src="/mockup-notification.png"
                alt="Restaurant notification to confirm"
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
              <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500 mt-6 text-center max-w-[280px]">
                Clean notification in your WhatsApp. Tap YES to confirm or Decline to reject.
              </p>
            </div>

            {/* Reminder */}
            <div className="flex flex-col items-center opacity-0 animate-fade-in-up delay-300">
              <h3 className="font-['Season_Mix_TRIAL'] text-[24px] text-neutral-900 mb-6 text-center h-20 flex items-center">
                Automatic reminders sent
              </h3>
              <img
                src="/mockup-reminder.png"
                alt="Automatic booking reminder"
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
              <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500 mt-6 text-center max-w-[280px]">
                Customer gets friendly reminder. Can confirm, reschedule, or cancel easily.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results / Proof */}
      <AnimatedSection>
        <div className="w-full py-32 px-6 bg-white">
          <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-['Season_Mix_TRIAL'] text-[48px] font-[400] leading-[52px] text-neutral-900 mb-6">
              The results restaurants see
            </h2>
            <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 max-w-[700px] mx-auto">
              After switching to Caboo, most South African restaurants report these improvements
              within the first month of use.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-['Season_Mix_TRIAL'] text-[52px] leading-[52px] text-neutral-700 mb-2">
                <CountUp end={87} suffix="%" className="inline-block" />
              </div>
              <p className="font-['Geist'] text-[14px] leading-[20px] text-neutral-600">
                Bookings captured that would've been missed
              </p>
            </div>
            <div className="text-center">
              <div className="font-['Season_Mix_TRIAL'] text-[52px] leading-[52px] text-neutral-700 mb-2">
                <CountUp end={91} suffix="%" className="inline-block" />
              </div>
              <p className="font-['Geist'] text-[14px] leading-[20px] text-neutral-600">
                Reduction in no-shows with reminders
              </p>
            </div>
            <div className="text-center">
              <div className="font-['Season_Mix_TRIAL'] text-[52px] leading-[52px] text-neutral-700 mb-2">
                R<CountUp end={22} suffix="K" className="inline-block" />
              </div>
              <p className="font-['Geist'] text-[14px] leading-[20px] text-neutral-600">
                Average monthly revenue recovered
              </p>
            </div>
            <div className="text-center">
              <div className="font-['Season_Mix_TRIAL'] text-[52px] leading-[52px] text-neutral-700 mb-2">
                <CountUp end={2.5} suffix="h" className="inline-block" duration={1500} />
              </div>
              <p className="font-['Geist'] text-[14px] leading-[20px] text-neutral-600">
                Daily staff time freed up
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500">
              Based on data from South African restaurants using automated booking systems
            </p>
          </div>
        </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <div className="w-full py-32 px-6 bg-[#FCF6EF] bg-[url('https://res.cloudinary.com/subframe/image/upload/v1763074076/uploads/13740/yaaf7xczdif74hxwedcb.png')] bg-[right_-10rem_bottom_-10rem] bg-[length:1200px] bg-no-repeat">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-20">
            <h2 className="font-['Season_Mix_TRIAL'] text-[48px] font-[400] leading-[52px] text-neutral-900 mb-6">
              Built for how you actually work
            </h2>
            <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 max-w-[600px]">
              One subscription includes everything. No add-ons, no complexity,
              no learning curve. Just intelligent WhatsApp booking management that fits
              into your restaurant's existing workflow.
            </p>
          </div>

          <div className="max-w-[900px]">
            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    Smart booking conversations
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Understands natural booking requests. Handles follow-up questions.
                  Collects party size, date, time, and special requests automatically.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    One-tap confirmations
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  WhatsApp notification with booking details and simple Confirm/Decline buttons.
                  Customer gets instant confirmation. Booking logged automatically.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    Automatic reminders
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600 mb-4">
                  Reminders sent 3 hours before booking (customizable timing).
                  Customers can confirm or cancel easily. Immediate notification if they cancel.
                </p>
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500">
                  Example: "Hi Sarah, reminder about your table for 4 tonight at 7pm. Reply 1 to confirm, 2 to cancel."
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    Team notifications
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Send notifications to owner, manager, or team WhatsApp groups.
                  Everyone who needs to see bookings gets notified. Email backup available.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    Works with existing systems
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Complements Dineplan, FOMO, paper diaries, or whatever you use.
                  We handle WhatsApp. You handle everything else. No migration required.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    Analytics dashboard
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Weekly reports on booking performance, no-show rates, peak times, and revenue recovered.
                  Simple insights to help you make better decisions.
                </p>
              </div>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <AnimatedSection>
        <div id="pricing" className="w-full py-32 px-6 bg-white">
          <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-['Season_Mix_TRIAL'] text-[48px] font-[400] leading-[52px] text-neutral-900 mb-6">
              Simple, honest pricing
            </h2>
            <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 max-w-[600px] mx-auto">
              One plan with everything included. No setup fees, no contracts, no surprises.
            </p>
          </div>

          <div className="max-w-[700px] mx-auto text-center">
            <div className="mb-12">
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="font-['Season_Mix_TRIAL'] text-[72px] leading-[72px] text-neutral-900">R599</span>
                <span className="font-['Geist'] text-[24px] text-neutral-600">/month</span>
              </div>
              <p className="font-['Geist'] text-[16px] text-neutral-600 mb-2">
                Try free for 14 days
              </p>
              <p className="font-['Geist'] text-[14px] text-neutral-500">
                No credit card required • Cancel anytime
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-12 text-left max-w-[500px] mx-auto">
              <div className="flex items-center gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0" size={20} />
                <span className="font-['Geist'] text-[16px] text-neutral-700">Unlimited bookings</span>
              </div>
              <div className="flex items-center gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0" size={20} />
                <span className="font-['Geist'] text-[16px] text-neutral-700">Automatic reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0" size={20} />
                <span className="font-['Geist'] text-[16px] text-neutral-700">Team notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0" size={20} />
                <span className="font-['Geist'] text-[16px] text-neutral-700">WhatsApp support</span>
              </div>
              <div className="flex items-center gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0" size={20} />
                <span className="font-['Geist'] text-[16px] text-neutral-700">Weekly analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0" size={20} />
                <span className="font-['Geist'] text-[16px] text-neutral-700">All features included</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-full bg-brand-600 px-3 py-2 max-w-[300px] mx-auto mb-4 btn-hover-lift">
              <Button size="large" onClick={() => window.location.href = '/signup'}>
                Start your free trial
              </Button>
            </div>
          </div>
        </div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection>
        <div id="faq" className="w-full py-32 px-6 bg-white">
          <div className="max-w-[900px] mx-auto">
          <div className="mb-20">
            <h2 className="font-['Season_Mix_TRIAL'] text-[48px] font-[400] leading-[52px] text-neutral-900 mb-6">
              Common questions
            </h2>
            <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 max-w-[600px]">
              Everything you need to know about using Caboo.
            </p>
          </div>

          <div>
            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    Do I need to change my WhatsApp number?
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  No. Keep your existing WhatsApp Business number. We enhance it with automation—we don't replace it.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    How do I receive and manage bookings?
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  All notifications come directly to your WhatsApp. You see booking details with Confirm/Decline buttons.
                  Tap one. Done. Can also send to manager or team group.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    What if I use Dineplan or another system?
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Caboo works alongside Dineplan, FOMO, or whatever you use. We handle WhatsApp bookings.
                  You keep using your existing system for everything else.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    Can I reply to customers manually?
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Yes, anytime. Just reply in WhatsApp normally. The bot automatically steps back when you take over.
                  You're always in control.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    Can I customize the bot messages?
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Yes. Customize tone, language, and style to match your restaurant's personality.
                  We adjust during setup or anytime after through support.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    How do I cancel?
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  Cancel anytime with one click. No contracts, no fees, no questions. Your WhatsApp returns to normal immediately.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    Do my staff need training?
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  No. Staff use WhatsApp normally. The only new thing: tap Confirm or Decline when bookings arrive.
                  Most restaurants are comfortable within the first day.
                </p>
              </div>
            </Accordion>

            <Accordion
              trigger={
                <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                  <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                    What about phone and walk-in bookings?
                  </span>
                  <FeatherArrowRight className="text-neutral-400" size={24} />
                </div>
              }
            >
              <div className="py-6">
                <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
                  We only handle WhatsApp bookings. You continue managing phone calls and walk-ins however you currently do.
                  We're adding intelligence to one channel, not taking over your operation.
                </p>
              </div>
            </Accordion>
          </div>
        </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <div className="w-full py-32 px-6 bg-white border-t border-neutral-border">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-['Season_Mix_TRIAL'] text-[48px] font-[400] leading-[52px] text-neutral-900 mb-6">
            Ready to make WhatsApp work for you?
          </h2>
          <p className="font-['Geist'] text-[20px] font-[300] leading-[32px] text-neutral-600 mb-10">
            Join South African restaurants who've made booking management effortless.
            Try free for 14 days—no credit card required.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 rounded-full bg-brand-600 px-3 py-2 btn-hover-lift">
              <Button size="large" onClick={() => window.location.href = '/signup'}>
                Start your free trial
              </Button>
            </div>
            <p className="font-['Geist'] text-[14px] text-neutral-500">
              5-minute setup • Works with your existing number • Cancel anytime
            </p>
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
                <li><a href="#what-is-caboo" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">How It Works</a></li>
                <li><a href="#pricing" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">Pricing</a></li>
                <li><a href="#faq" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">FAQ</a></li>
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

export default LandingPage;
