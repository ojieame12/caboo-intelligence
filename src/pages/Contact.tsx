import React, { useState } from "react";
import { Button } from "@/subframe/components/Button";
import { AnimatedInput, validators } from "@/components/AnimatedInput";
import { AnimatedTextArea } from "@/components/AnimatedTextArea";
import { FeatherMail, FeatherMapPin, FeatherClock, FeatherCheck } from "@subframe/core";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // TODO: Replace with actual email service (SendGrid, Resend, etc.)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, restaurant, message })
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSuccess(true);
      setName("");
      setEmail("");
      setRestaurant("");
      setMessage("");
    } catch (err) {
      setError("Unable to send message. Please email us directly at support@caboo.design");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Contact Content */}
      <div className="w-full py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-[1100px] mx-auto">

          {/* Header */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h1 className="font-['Season_Mix_TRIAL'] text-[40px] md:text-[52px] font-[400] leading-[44px] md:leading-[56px] text-neutral-900 mb-6">
              Get in touch
            </h1>
            <p className="font-['Geist'] text-[18px] md:text-[20px] font-[300] leading-[30px] md:leading-[34px] text-neutral-600 max-w-[600px] mx-auto">
              Questions about Caboo? Want to discuss custom solutions?
              We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">

            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in-up delay-100">

              {/* Email */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <FeatherMail className="text-brand-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                      Email
                    </h3>
                    <a href="mailto:support@caboo.design" className="font-['Geist'] text-[16px] font-[300] text-brand-600 hover:underline block mb-2">
                      support@caboo.design
                    </a>
                    <p className="font-['Geist'] text-[13px] font-[300] text-neutral-500">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <FeatherClock className="text-brand-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                      Business hours
                    </h3>
                    <p className="font-['Geist'] text-[15px] font-[300] text-neutral-700 mb-1">
                      Monday - Friday
                    </p>
                    <p className="font-['Geist'] text-[15px] font-[300] text-neutral-700">
                      9:00 AM - 5:00 PM SAST
                    </p>
                  </div>
                </div>
              </div>

              {/* Company */}
              <div className="bg-neutral-50 rounded-2xl p-6 md:p-8">
                <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-4">
                  Company Details
                </h3>
                <div className="space-y-2">
                  <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">
                    Caboo Intelligence (Pty) Ltd
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">
                    Registration: 2025/868763/07
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">
                    VAT: 9831457198
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 animate-fade-in-up delay-200">
              <div className="bg-white rounded-2xl p-6 md:p-10 border border-neutral-200">
                <h2 className="font-['Season_Mix_TRIAL'] text-[28px] md:text-[32px] font-[400] text-neutral-900 mb-8">
                  Send us a message
                </h2>

                {success ? (
                  <div className="bg-success-50 border border-success-200 rounded-2xl p-8 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-success-600 flex items-center justify-center mx-auto mb-6">
                      <FeatherCheck className="text-white" size={32} />
                    </div>
                    <h3 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-success-900 mb-3">
                      Message sent!
                    </h3>
                    <p className="font-['Geist'] text-[15px] font-[300] text-success-700 mb-6">
                      We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="font-['Geist'] text-[14px] text-brand-600 hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-8">
                      <AnimatedInput
                        label="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        validate={validators.required}
                      />

                      <AnimatedInput
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@restaurant.co.za"
                        required
                        validate={validators.email}
                      />

                      <AnimatedInput
                        label="Restaurant or business name"
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        placeholder="Your Restaurant (optional)"
                        helperText="Helps us provide better assistance"
                      />

                      <AnimatedTextArea
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you?"
                        required
                        rows={6}
                        maxLength={1000}
                      />
                    </div>

                    {error && (
                      <div className="rounded-2xl border border-error-200 bg-error-50 px-6 py-4 animate-fade-in">
                        <p className="font-['Geist'] text-[14px] text-error-700">{error}</p>
                      </div>
                    )}

                    <div className="pt-4">
                      <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Sending..." : "Send message"}
                        </Button>
                      </div>
                      <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500 text-center mt-4">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <div className="mt-12 text-center animate-fade-in-up delay-300">
            <p className="font-['Geist'] text-[15px] font-[300] text-neutral-600 mb-4">
              Prefer to email directly?
            </p>
            <a
              href="mailto:support@caboo.design?subject=Inquiry from caboo.design"
              className="inline-flex items-center gap-2 font-['Geist'] text-[16px] font-medium text-brand-600 hover:underline"
            >
              <FeatherMail size={18} />
              support@caboo.design
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 md:py-16 px-4 md:px-6 bg-neutral-700 mt-16">
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

export default Contact;
