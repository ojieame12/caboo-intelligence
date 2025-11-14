import React, { useState } from "react";
import { Button } from "@/subframe/components/Button";
import { AnimatedInput, validators } from "@/components/AnimatedInput";
import { AnimatedTextArea } from "@/components/AnimatedTextArea";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Handle form submission
    console.log({ name, email, restaurant, message });
  };

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

      {/* Contact Content */}
      <div className="w-full py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-['Season_Mix_TRIAL'] text-[56px] font-[400] leading-[60px] text-neutral-900 mb-6 text-center">
            Get in touch
          </h1>
          <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 text-center mb-16">
            Have questions about Caboo? We're here to help.
          </p>

          <div className="grid grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-8">
                Contact information
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-3">
                    Email
                  </h3>
                  <p className="font-['Geist'] text-[16px] font-[300] text-neutral-600">
                    <a href="mailto:support@caboo.design" className="text-brand-600 hover:underline">
                      support@caboo.design
                    </a>
                  </p>
                  <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500 mt-1">
                    We typically respond within 24 hours
                  </p>
                </div>

                <div>
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-3">
                    Business hours
                  </h3>
                  <p className="font-['Geist'] text-[16px] font-[300] text-neutral-600">
                    Monday - Friday: 9am - 5pm SAST
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-2xl p-6">
                  <h3 className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                    Company details
                  </h3>
                  <div className="space-y-2">
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">Caboo Intelligence (Pty) Ltd</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">Registration: 2025/868763/07</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-700">VAT: 9831457198</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-8">
                Send a message
              </h2>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-8 animate-fade-in-up delay-100">
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
                    label="Restaurant name"
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                    placeholder="Your Restaurant"
                    helperText="Optional - helps us assist you better"
                  />

                  <AnimatedTextArea
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    required
                    rows={5}
                    maxLength={500}
                  />
                </div>

                <div className="pt-4 animate-fade-in delay-200">
                  <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send message"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-16 px-6 bg-neutral-700 mt-16">
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

export default Contact;
