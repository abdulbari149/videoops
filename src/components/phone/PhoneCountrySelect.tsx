"use client";

import * as React from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type CountryOption = {
  value?: string;
  label: string;
  divider?: boolean;
};

function getSelectedOption(
  options: CountryOption[],
  value: string | undefined
): CountryOption | undefined {
  for (const option of options) {
    if (!option.divider) {
      if (isSameOptionValue(option.value, value)) {
        return option;
      }
    }
  }
}

function isSameOptionValue(
  value1: string | undefined,
  value2: string | undefined
): boolean {
  if (value1 === undefined || value1 === null) {
    return value2 === undefined || value2 === null;
  }
  return value1 === value2;
}

function DefaultArrow() {
  return <div className="PhoneInputCountrySelectArrow" />;
}

/** ~5 visible rows; remainder scrolls (SelectItem ~py-1.5 + text-sm line). */
const SELECT_CONTENT_MAX_HEIGHT =
  "max-h-[min(11.25rem,var(--radix-select-content-available-height))]";

export type PhoneCountrySelectProps = {
  value?: string;
  onChange: (country?: string) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
  iconComponent?: React.ElementType<{
    "aria-hidden"?: boolean;
    country?: string;
    label: string;
    aspectRatio?: number;
  }>;
  arrowComponent?: React.ComponentType;
  unicodeFlags?: boolean;
  name?: string;
  className?: string;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

export function PhoneCountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  iconComponent: Icon,
  arrowComponent: Arrow = DefaultArrow,
  unicodeFlags,
  name,
  className: countrySelectClassName,
  onFocus,
  onBlur,
  "aria-label": ariaLabel,
}: PhoneCountrySelectProps) {
  const selectedOption = React.useMemo(
    () => getSelectedOption(options, value),
    [options, value]
  );

  const selectValue = value || "ZZ";

  const handleValueChange = (v: string) => {
    onChange(v === "ZZ" ? undefined : v);
  };

  const blocked = disabled || readOnly;

  return (
    <div className="PhoneInputCountry">
      {name ? <input name={name} type="hidden" value={selectValue} readOnly /> : null}
      <Select
        disabled={blocked}
        value={selectValue}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          aria-label={ariaLabel}
          className={cn(
            "PhoneInputCountrySelect absolute inset-0 z-[1] h-full w-full min-w-0 cursor-pointer border-0 bg-transparent p-0 opacity-0 shadow-none",
            "focus-visible:ring-0 data-[size=default]:h-full [&>svg]:hidden",
            blocked && "cursor-default",
            countrySelectClassName
          )}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className={cn(
            SELECT_CONTENT_MAX_HEIGHT,
            "min-w-[min(100vw-2rem,20rem)]"
          )}
          align="start"
        >
          {options.map((opt, index) => {
            if (opt.divider) {
              return (
                <SelectSeparator key={`sep-${index}`} className="my-1" />
              );
            }
            const v = opt.value || "ZZ";
            return (
              <SelectItem key={v} value={v} textValue={opt.label}>
                {opt.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {selectedOption &&
        (unicodeFlags && value ? (
          <div className="PhoneInputCountryIconUnicode pointer-events-none">
            {getUnicodeFlagIcon(value)}
          </div>
        ) : Icon ? (
          <Icon
            aria-hidden
            country={value}
            label={selectedOption.label}
            aspectRatio={unicodeFlags ? 1 : undefined}
          />
        ) : null)}
      <span className="pointer-events-none">
        <Arrow />
      </span>
    </div>
  );
}
