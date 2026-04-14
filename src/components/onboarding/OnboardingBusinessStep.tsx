"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrganizationSizeSelect } from "@/components/onboarding/OrganizationSizeSelect";

type Props = {
  businessName: string;
  orgSize: string;
  onBusinessNameChange: (v: string) => void;
  onOrgSizeChange: (v: string) => void;
  pending: boolean;
  logoUploading: boolean;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
};

export function OnboardingBusinessStep({
  businessName,
  orgSize,
  onBusinessNameChange,
  onOrgSizeChange,
  pending,
  logoUploading,
  onLogoChange,
  onContinue,
}: Props) {
  const businessValid = Boolean(businessName.trim());
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="onboarding-business">Business name</Label>
        <Input
          className="h-11 text-base md:text-base"
          id="onboarding-business"
          value={businessName}
          onChange={(e) => onBusinessNameChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="onboarding-logo">Business logo (optional)</Label>
        <Input
          accept="image/*"
          className="text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
          disabled={logoUploading || pending}
          id="onboarding-logo"
          type="file"
          onChange={onLogoChange}
        />
      </div>
      <OrganizationSizeSelect
        disabled={pending || logoUploading}
        id="onboarding-org"
        value={orgSize}
        onValueChange={onOrgSizeChange}
      />
      <Button
        className="mt-2 h-11 rounded-full"
        disabled={pending || !businessValid || logoUploading}
        type="button"
        onClick={onContinue}
      >
        {pending ? "Saving…" : "Continue"}
      </Button>
    </>
  );
}
