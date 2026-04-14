"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InternationalPhoneInput } from "@/components/phone/InternationalPhoneInput";
import { isValidPhoneNumber } from "libphonenumber-js";

type Props = {
  firstName: string;
  lastName: string;
  phone: string;
  onFirstNameChange: (v: string) => void;
  onLastNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  pending: boolean;
  onContinue: () => void;
};

export function OnboardingPersonalStep({
  firstName,
  lastName,
  phone,
  onFirstNameChange,
  onLastNameChange,
  onPhoneChange,
  pending,
  onContinue,
}: Props) {
  const phoneOk = isValidPhoneNumber(phone);
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="min-w-0 space-y-2 sm:flex-1">
          <Label htmlFor="onboarding-first">First name</Label>
          <Input
            className="h-11 text-base md:text-base"
            id="onboarding-first"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
          />
        </div>
        <div className="min-w-0 space-y-2 sm:flex-1">
          <Label htmlFor="onboarding-last">Last name</Label>
          <Input
            className="h-11 text-base md:text-base"
            id="onboarding-last"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="onboarding-phone">Phone number</Label>
        <InternationalPhoneInput
          disabled={pending}
          id="onboarding-phone"
          value={phone}
          onChange={onPhoneChange}
        />
      </div>
      <Button
        className="mt-2 h-11 rounded-full"
        disabled={pending || !firstName.trim() || !lastName.trim() || !phoneOk}
        type="button"
        onClick={onContinue}
      >
        {pending ? "Saving…" : "Continue"}
      </Button>
    </>
  );
}
