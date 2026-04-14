"use client";

import { updateProfileSettings } from "@/lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InternationalPhoneInput } from "@/components/phone/InternationalPhoneInput";
import { toastActionResult } from "@/lib/toast-action-result";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  defaultFirstName: string;
  defaultLastName: string;
  defaultPhone: string;
};

export function ProfileSettingsForm({ defaultFirstName, defaultLastName, defaultPhone }: Props) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [phone, setPhone] = useState(defaultPhone);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const fd = new FormData();
    fd.set("firstName", firstName);
    fd.set("lastName", lastName);
    fd.set("phone", phone);
    const result = await updateProfileSettings(fd);
    setPending(false);
    if (!toastActionResult(result)) return;
    router.refresh();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="settings-first-name">First name</Label>
          <Input
            id="settings-first-name"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="settings-last-name">Last name</Label>
          <Input
            id="settings-last-name"
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="settings-phone">Phone</Label>
        <InternationalPhoneInput id="settings-phone" name="phone" value={phone} onChange={setPhone} />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}
