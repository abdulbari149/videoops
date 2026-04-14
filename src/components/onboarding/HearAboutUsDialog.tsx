"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HearAboutUsField } from "@/components/onboarding/HearAboutUsField";
import type { HearOption } from "./constants";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hearSelected: HearOption | null;
  hearOtherDetail: string;
  onHearSelectedChange: (v: HearOption | null) => void;
  onHearOtherDetailChange: (v: string) => void;
  onConfirm: () => void;
  pending: boolean;
};

export function HearAboutUsDialog({
  open,
  onOpenChange,
  hearSelected,
  hearOtherDetail,
  onHearSelectedChange,
  onHearOtherDetailChange,
  onConfirm,
  pending,
}: Props) {
  const hearValid =
    hearSelected != null &&
    (hearSelected !== "Other" || hearOtherDetail.trim().length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,640px)] gap-0 overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Where did you hear about us?</DialogTitle>
          <DialogDescription>
            Last step—help us understand what is working. Select one option below.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <HearAboutUsField
            disabled={pending}
            idPrefix="onboarding-hear-modal"
            otherDetail={hearOtherDetail}
            selected={hearSelected}
            showLegend={false}
            onOtherDetailChange={onHearOtherDetailChange}
            onSelectedChange={onHearSelectedChange}
          />
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            className="rounded-full"
            disabled={pending}
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-full"
            disabled={pending || !hearValid}
            type="button"
            onClick={onConfirm}
          >
            {pending ? "Finishing…" : "Finish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
