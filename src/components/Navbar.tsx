import React from "react";
import { Button } from "@/subframe/components/Button";

export function Navbar() {
  return (
    <nav className="w-full border-b border-neutral-border bg-white sticky top-0 z-50">
      <div className="container max-w-[1280px] mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="font-heading-2 text-xl text-neutral-900">Caboo</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-body text-neutral-600 hover:text-neutral-900 transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-body text-neutral-600 hover:text-neutral-900 transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-body text-neutral-600 hover:text-neutral-900 transition-colors">
            FAQ
          </a>
          <a href="/privacy" className="text-body text-neutral-600 hover:text-neutral-900 transition-colors">
            Privacy
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="neutral-tertiary" size="medium">
            Login
          </Button>
          <Button variant="brand-primary" size="medium">
            Start Free Trial
          </Button>
        </div>
      </div>
    </nav>
  );
}
