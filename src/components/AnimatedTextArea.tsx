import React, { useState } from "react";
import { FeatherAlertCircle } from "@subframe/core";

interface AnimatedTextAreaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  rows?: number;
  maxLength?: number;
}

export function AnimatedTextArea({
  label,
  placeholder = "",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  helperText,
  rows = 4,
  maxLength,
}: AnimatedTextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;
  const characterCount = value.length;
  const showCount = maxLength && (isFocused || characterCount > maxLength * 0.8);

  return (
    <div className="relative w-full">
      {/* TextArea Container */}
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
            ${isFocused && !error
              ? 'text-brand-600'
              : error
              ? 'text-error-600'
              : 'text-neutral-600'
            }
          `}
        >
          {label}{required && <span className="text-brand-600 ml-1">*</span>}
        </label>

        {/* TextArea Field */}
        <textarea
          id={label}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={isActive ? placeholder : ""}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full bg-transparent resize-none
            font-['Geist'] text-[16px] font-[300] text-neutral-900
            pb-3 pt-6
            outline-none
            transition-all duration-300
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />

        {/* Character Count */}
        {showCount && maxLength && (
          <div className="absolute right-0 bottom-3 text-[12px] font-['Geist'] text-neutral-400 animate-fade-in">
            {characterCount}/{maxLength}
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
              ${error ? 'bg-error-600' : 'bg-brand-600'}
            `}
          ></div>
        </div>
      </div>

      {/* Helper Text / Error Message */}
      {(helperText || error) && (
        <div className={`mt-2 min-h-[20px] transition-all duration-200 ${error ? 'animate-fade-in' : ''}`}>
          {error ? (
            <p className="font-['Geist'] text-[13px] font-[300] text-error-600 flex items-center gap-2">
              <FeatherAlertCircle size={14} />
              {error}
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
