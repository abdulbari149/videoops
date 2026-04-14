"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORG_OPTIONS } from "./constants";

type Props = {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  /** Defaults to onboarding copy. */
  label?: string;
};

export function OrganizationSizeSelect({
  id,
  value,
  onValueChange,
  disabled,
  label = "How large is your organization?",
}: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select disabled={disabled} onValueChange={onValueChange} value={value}>
        <SelectTrigger className="h-11 w-full" id={id}>
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {ORG_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
