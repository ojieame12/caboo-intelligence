import React from "react";
import { Button } from "@/subframe/components/Button";
import { TextField } from "@/subframe/components/TextField";

function SignIn() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-default-background">
      {/* Navbar */}
      <div className="w-full border-b border-neutral-border bg-white">
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

          <div className="flex items-center gap-3">
            <a href="/signup" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </div>

      {/* Sign In Content */}
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-[420px]">
          <div className="text-center mb-10">
            <h1 className="font-['Season_Mix_TRIAL'] text-[44px] font-[400] leading-[48px] text-neutral-900 mb-4">
              Welcome back
            </h1>
            <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
              Sign in to manage your WhatsApp bookings
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-2 block">
                Email address
              </label>
              <TextField
                placeholder="john@restaurant.co.za"
                className="w-full"
              />
            </div>

            <div>
              <label className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-2 block">
                Password
              </label>
              <TextField
                type="password"
                placeholder="Enter your password"
                className="w-full"
              />
              <div className="flex items-center justify-end mt-2">
                <a href="/forgot-password" className="font-['Geist'] text-[12px] font-[300] text-brand-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-4 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
                <Button size="large" className="w-full">
                  Sign in
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
            <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600 mb-4">
              New to Caboo?
            </p>
            <a href="/signup" className="font-['Geist'] text-[16px] font-medium text-brand-600 hover:underline">
              Start your free 14-day trial →
            </a>
          </div>
        </div>
      </div>

      {/* Footer - Minimal */}
      <footer className="w-full py-8 px-6 border-t border-neutral-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500">
            © 2025 Caboo Intelligence (Pty) Ltd
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;
