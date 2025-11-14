import React, { useEffect, useState } from "react";
import { Loader } from "@/subframe/components/Loader";
import { FeatherCheck } from "@subframe/core";

function Processing() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Connecting to WhatsApp", duration: 2000 },
    { label: "Creating your workspace", duration: 2000 },
    { label: "Setting up conversation flows", duration: 2000 },
    { label: "Activating booking assistant", duration: 1500 },
  ];

  useEffect(() => {
    const timers = steps.map((step, index) => {
      const totalDelay = steps.slice(0, index).reduce((sum, s) => sum + s.duration, 0);
      return setTimeout(() => setCurrentStep(index + 1), totalDelay);
    });

    // Auto-redirect to settings after all steps complete
    const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);
    const redirectTimer = setTimeout(() => {
      window.location.href = '/onboarding/settings';
    }, totalDuration + 1000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-default-background px-6">
      <div className="w-full max-w-[600px] text-center">
        {/* Animated Logo/Loader */}
        <div className="mb-12 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-6">
            <Loader size="large" />
          </div>
          <h1 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] leading-[44px] text-neutral-900 mb-4">
            Setting up your intelligent assistant
          </h1>
          <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
            This will only take a moment...
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-10 border border-neutral-200 animate-fade-in-up delay-200">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 transition-all duration-500 ${
                  currentStep > index ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    currentStep > index
                      ? 'bg-success-600'
                      : currentStep === index
                      ? 'bg-brand-600'
                      : 'bg-neutral-200'
                  }`}
                >
                  {currentStep > index ? (
                    <FeatherCheck className="text-white" size={16} />
                  ) : (
                    <span className="text-white text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p
                    className={`font-['Geist'] text-[15px] transition-all duration-500 ${
                      currentStep > index
                        ? 'text-neutral-500 line-through'
                        : currentStep === index
                        ? 'text-neutral-900 font-medium'
                        : 'text-neutral-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {currentStep === index && (
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5">
                      <Loader size="small" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-8 animate-fade-in delay-400">
          <p className="font-['Geist'] text-[14px] font-[300] text-neutral-500">
            Don't close this window. We're configuring your account securely.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Processing;
