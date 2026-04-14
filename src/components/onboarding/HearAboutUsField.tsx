"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HEAR_OPTIONS, type HearOption } from "./constants";

type Props = {
  idPrefix: string;
  selected: HearOption | null;
  otherDetail: string;
  onSelectedChange: (value: HearOption | null) => void;
  onOtherDetailChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  /** When false, legend is visually hidden (e.g. dialog already has a title). */
  showLegend?: boolean;
};

/** Single-choice UX using checkboxes: checking one clears the others. */
export function HearAboutUsField({
  idPrefix,
  selected,
  otherDetail,
  onSelectedChange,
  onOtherDetailChange,
  disabled,
  className,
  showLegend = true,
}: Props) {
  return (
    <fieldset className={cn("space-y-3", className)} disabled={disabled}>
      <legend className={cn("text-sm font-medium leading-none", !showLegend && "sr-only")}>
        How did you hear about us?
      </legend>
      {showLegend ? (
        <p className="text-sm text-muted-foreground">Select one option.</p>
      ) : null}
      <div className="space-y-3 pt-1">
        {HEAR_OPTIONS.map((opt, i) => {
          const id = `${idPrefix}-opt-${i}`;
          return (
            <div key={opt} className="flex items-start gap-3">
              <Checkbox
                checked={selected === opt}
                className="mt-0.5"
                id={id}
                onCheckedChange={(c) => {
                  if (c === true) {
                    onSelectedChange(opt);
                    if (opt !== "Other") onOtherDetailChange("");
                  } else if (c === false && selected === opt) {
                    onSelectedChange(null);
                  }
                }}
              />
              <Label className="cursor-pointer font-normal leading-snug" htmlFor={id}>
                {opt}
              </Label>
            </div>
          );
        })}
      </div>
      {selected === "Other" && (
        <div className="space-y-2 pt-1">
          <Label htmlFor={`${idPrefix}-other-detail`}>Tell us more</Label>
          <Input
            className="h-10 text-sm"
            id={`${idPrefix}-other-detail`}
            value={otherDetail}
            onChange={(e) => onOtherDetailChange(e.target.value)}
          />
        </div>
      )}
    </fieldset>
  );
}
