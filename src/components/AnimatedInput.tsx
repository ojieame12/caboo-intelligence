import React, { useState, useRef, useEffect } from "react";
import { FeatherEye, FeatherEyeOff, FeatherCheck, FeatherAlertCircle } from "@subframe/core";

interface AnimatedInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: boolean;
  validate?: (value: string) => string | null;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

export function AnimatedInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  success = false,
  validate,
  required = false,
  disabled = false,
  helperText,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;
  const displayError = error || validationError;
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  useEffect(() => {
    if (validate && value && !isFocused) {
      const validationResult = validate(value);
      setValidationError(validationResult);
    } else {
      setValidationError(null);
    }
  }, [value, validate, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      {/* Input Container */}
      <div className="relative">
        {/* Label */}
        <label
          htmlFor={label}
          className={`
            absolute left-0 font-['Geist'] pointer-events-none
            transition-all duration-300 ease-out origin-left
            ${isActive
              ? 'top-0 text-[12px] font-medium translate-y-[-100%] mb-2'
              : 'top-[12px] text-[16px] font-[300]'
            }
            ${isFocused && !displayError
              ? 'text-brand-600'
              : displayError
              ? 'text-error-600'
              : success
              ? 'text-success-600'
              : 'text-neutral-600'
            }
          `}
        >
          {label}{required && <span className="text-brand-600 ml-1">*</span>}
        </label>

        {/* Input Field */}
        <input
          ref={inputRef}
          id={label}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={isActive ? placeholder : ""}
          className={`
            w-full bg-transparent
            font-['Geist'] text-[16px] font-[300] text-neutral-900
            pb-3 pt-6
            outline-none
            transition-all duration-300
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />

        {/* Password Toggle */}
        {isPassword && hasValue && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors p-2"
          >
            {showPassword ? (
              <FeatherEyeOff size={18} />
            ) : (
              <FeatherEye size={18} />
            )}
          </button>
        )}

        {/* Success Icon */}
        {success && !displayError && hasValue && !isPassword && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-success-600 animate-fade-in">
            <FeatherCheck size={18} />
          </div>
        )}

        {/* Error Icon */}
        {displayError && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-error-600 animate-fade-in">
            <FeatherAlertCircle size={18} />
          </div>
        )}

        {/* Animated Underline */}
        <div className="relative h-[2px] overflow-hidden">
          {/* Base Line */}
          <div className="absolute inset-0 bg-neutral-200"></div>

          {/* Active Line */}
          <div
            className={`
              absolute inset-0 origin-center transition-all duration-300 ease-out
              ${isFocused ? 'scale-x-100' : 'scale-x-0'}
              ${displayError
                ? 'bg-error-600'
                : success
                ? 'bg-success-600'
                : 'bg-brand-600'
              }
            `}
          ></div>
        </div>
      </div>

      {/* Helper Text / Error Message */}
      {(helperText || displayError) && (
        <div className={`mt-2 min-h-[20px] transition-all duration-200 ${displayError ? 'animate-fade-in' : ''}`}>
          {displayError ? (
            <p className="font-['Geist'] text-[13px] font-[300] text-error-600 flex items-center gap-2">
              <FeatherAlertCircle size={14} />
              {displayError}
            </p>
          ) : helperText ? (
            <p className="font-['Geist'] text-[13px] font-[300] text-neutral-500">
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

// Smart validation functions
export const validators = {
  email: (value: string): string | null => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return null;
  },

  phone: (value: string): string | null => {
    if (!value) return null;
    const phoneRegex = /^(\+27|0)[0-9]{9}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return "Please enter a valid South African phone number";
    }
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return null;
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
    if (!/[0-9]/.test(value)) return "Include at least one number";
    return null;
  },

  required: (value: string): string | null => {
    if (!value || value.trim().length === 0) return "This field is required";
    return null;
  },

  minLength: (min: number) => (value: string): string | null => {
    if (!value) return null;
    if (value.length < min) return `Must be at least ${min} characters`;
    return null;
  },
};
