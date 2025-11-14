import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/subframe/components/Button";
import { AnimatedInput, validators } from "@/components/AnimatedInput";
import { FeatherCheck } from "@subframe/core";
import { api } from "@/lib/api";
import { useAuthContext } from "@/context/AuthContext";

type FormState = {
  restaurantName: string;
  ownerName: string;
  email: string;
  whatsappNumber: string;
  password: string;
};

const initialState: FormState = {
  restaurantName: "",
  ownerName: "",
  email: "",
  whatsappNumber: "",
  password: "",
};

function SignUp() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const response = await api.post<{
        token: string;
        user: { id: string; email: string };
        restaurant: { id: string; name: string; status: string };
      }>("/api/signup", {
        restaurantName: form.restaurantName.trim(),
        ownerName: form.ownerName.trim(),
        email: form.email.trim(),
        whatsappNumber: form.whatsappNumber.trim(),
        password: form.password,
      });

      login({
        token: response.token,
        email: response.user.email,
        userId: response.user.id,
        restaurant: response.restaurant,
      });

      navigate("/beta-waitlist");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account right now.");
    } finally {
      setLoading(false);
    }
  };

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

          <div className="flex items-center gap-2">
            <span className="font-['Inter'] text-[14px] font-[400] text-neutral-600">
              Already have an account?
            </span>
            <a href="/signin" className="font-['Inter'] text-[14px] font-[400] text-brand-600 hover:text-brand-700 transition-colors">
              Sign in
            </a>
          </div>
        </div>
      </div>

      {/* Sign Up Content */}
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-[480px]">
          <div className="text-center mb-10">
            <h1 className="font-['Season_Mix_TRIAL'] text-[44px] font-[400] leading-[48px] text-neutral-900 mb-4">
              Start your free trial
            </h1>
            <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
              14 days free. No credit card required. Setup takes 5 minutes.
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-8 animate-fade-in-up delay-100">
              <AnimatedInput
                label="Restaurant name"
                value={form.restaurantName}
                onChange={(e) => handleChange("restaurantName", e.target.value)}
                placeholder="The Waterfront Bistro"
                required
                validate={validators.required}
              />

              <AnimatedInput
                label="Your name"
                value={form.ownerName}
                onChange={(e) => handleChange("ownerName", e.target.value)}
                placeholder="John Doe"
                required
                validate={validators.required}
              />

              <AnimatedInput
                label="Email address"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@restaurant.co.za"
                required
                validate={validators.email}
              />

              <AnimatedInput
                label="WhatsApp Business number"
                type="tel"
                value={form.whatsappNumber}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                placeholder="+27 82 123 4567"
                required
                validate={validators.phone}
                helperText="This should be your restaurant's WhatsApp Business number"
              />

              <AnimatedInput
                label="Create password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="At least 8 characters"
                required
                validate={validators.password}
                helperText="Must include uppercase letter and number"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="font-['Geist'] text-[14px] text-red-600">{error}</p>
              </div>
            )}

            <div className="pt-4">
              <div className="flex items-center gap-4 rounded-full bg-brand-600 px-2 py-1 mb-4 btn-hover-lift">
                <Button size="large" className="w-full" type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200">
              <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500 text-center">
                By creating an account, you agree to our{" "}
                <a href="/terms" className="text-brand-600 hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </form>

          <div className="mt-10 bg-neutral-50 rounded-2xl p-8">
            <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-4">
              What happens next:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  Connect your WhatsApp Business account (5 minutes)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  Bot goes live immediately
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                  Start handling bookings today
                </p>
              </div>
            </div>
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

export default SignUp;
