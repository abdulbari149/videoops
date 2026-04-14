"use client";

import { isValidPhoneNumber } from "libphonenumber-js";
import * as React from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { PhoneCountrySelect } from "@/components/phone/PhoneCountrySelect";
import { cn } from "@/lib/utils";

export type InternationalPhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  /** ISO 3166-1 alpha-2 country code for the default flag/dial prefix. */
  defaultCountry?: Country;
  className?: string;
};

/**
 * Country selector + phone field using libphonenumber (via react-phone-number-input).
 * Values are E.164 strings (e.g. +14155552671) or "" when empty.
 */
export function InternationalPhoneInput({
  value,
  onChange,
  disabled,
  id,
  name,
  defaultCountry = "US",
  className,
}: InternationalPhoneInputProps) {
  const invalid = value.length > 0 && !isValidPhoneNumber(value);

  return (
    <div
      className={cn(
        "flex h-11 w-full min-w-0 items-stretch rounded-lg border border-border bg-background px-2 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30",
        invalid && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20 dark:focus-within:ring-destructive/40",
        className
      )}
      style={
        {
          "--PhoneInput-color--focus": "var(--color-ring)",
          "--PhoneInputCountryFlag-borderColor": "color-mix(in srgb, var(--color-border) 80%, transparent)",
          "--PhoneInputCountrySelectArrow-color": "var(--color-muted-foreground)",
        } as React.CSSProperties
      }
    >
      <PhoneInput
        countrySelectComponent={PhoneCountrySelect}
        international
        countryCallingCodeEditable={false}
        defaultCountry={defaultCountry}
        value={value || undefined}
        onChange={(v) => onChange(v ?? "")}
        disabled={disabled}
        numberInputProps={{
          id,
          name,
          "aria-invalid": invalid,
          className: cn(
            "!m-0 !h-full min-h-0 min-w-0 flex-1 border-0 bg-transparent !px-1 !py-0 font-mono text-base text-foreground outline-none ring-0 md:text-sm",
            "placeholder:text-muted-foreground"
          ),
        }}
        className={cn(
          "PhoneInput !flex !h-full !min-h-0 w-full min-w-0 flex-1 items-center !border-0 !bg-transparent !p-0 !shadow-none"
        )}
      />
    </div>
  );
}
