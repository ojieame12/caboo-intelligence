import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/subframe/components/Button";
import { TextField } from "@/subframe/components/TextField";
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

      navigate("/dashboard");
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

          <div className="flex items-center gap-3">
            <a href="/signin" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              Already have an account? Sign in
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

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-2 block">
                Restaurant name
              </label>
              <TextField
                placeholder="The Waterfront Bistro"
                className="w-full"
                value={form.restaurantName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("restaurantName", e.target.value)}
              />
            </div>

            <div>
              <label className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-2 block">
                Your name
              </label>
              <TextField
                placeholder="John Doe"
                className="w-full"
                value={form.ownerName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("ownerName", e.target.value)}
              />
            </div>

            <div>
              <label className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-2 block">
                Email address
              </label>
              <TextField
                placeholder="john@restaurant.co.za"
                className="w-full"
                type="email"
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
              />
            </div>

            <div>
              <label className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-2 block">
                WhatsApp Business number
              </label>
              <TextField
                placeholder="+27 82 123 4567"
                className="w-full"
                value={form.whatsappNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("whatsappNumber", e.target.value)}
              />
              <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500 mt-2">
                This should be your restaurant's WhatsApp Business number
              </p>
            </div>

            <div>
              <label className="font-['Geist'] text-[14px] font-medium text-neutral-700 mb-2 block">
                Password
              </label>
              <TextField
                type="password"
                placeholder="Create a secure password"
                className="w-full"
                value={form.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)}
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
