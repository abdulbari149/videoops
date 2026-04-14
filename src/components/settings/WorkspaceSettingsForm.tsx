"use client";

import { OrganizationSizeSelect } from "@/components/onboarding/OrganizationSizeSelect";
import { updateWorkspaceSettings } from "@/lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrganizationSize } from "@/generated/prisma/enums";
import { toastActionResult } from "@/lib/toast-action-result";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  defaultBusinessName: string;
  defaultOrganizationSize: string | null;
};

export function WorkspaceSettingsForm({ defaultBusinessName, defaultOrganizationSize }: Props) {
  const router = useRouter();
  const [businessName, setBusinessName] = useState(defaultBusinessName);
  const [organizationSize, setOrganizationSize] = useState(
    defaultOrganizationSize ?? OrganizationSize.SOLO
  );
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const fd = new FormData();
    fd.set("businessName", businessName);
    fd.set("organizationSize", organizationSize);
    const result = await updateWorkspaceSettings(fd);
    setPending(false);
    if (!toastActionResult(result)) return;
    router.refresh();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="settings-business">Business name</Label>
        <Input
          id="settings-business"
          name="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
      </div>
      <OrganizationSizeSelect
        id="settings-org-size"
        label="Organization size"
        value={organizationSize}
        onValueChange={setOrganizationSize}
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save workspace"}
      </Button>
    </form>
  );
}
