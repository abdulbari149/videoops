"use client";

import { AppearanceSettingsForm } from "@/components/settings/AppearanceSettingsForm";
import { ProfileSettingsForm } from "@/components/settings/ProfileSettingsForm";
import { WorkspaceSettingsForm } from "@/components/settings/WorkspaceSettingsForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

type Props = {
  account: {
    email: string | null;
    name: string | null;
    signInLabel: string;
  };
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  workspace: {
    businessName: string;
    organizationSize: string | null;
  };
  themeId: string | null;
};

export function SettingsTabs({ account, profile, workspace, themeId }: Props) {
  return (
    <Tabs className="w-full gap-6" defaultValue="account">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="workspace">Workspace</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
      </TabsList>

      <TabsContent className="mt-0 flex flex-col gap-6 outline-none" value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your sign-in identity and email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-foreground">{account.email ?? "—"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">{account.name ?? "—"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Sign-in methods</span>
              <span className="font-medium text-foreground">{account.signInLabel}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Contact details used across VideoOps.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileSettingsForm
              defaultFirstName={profile.firstName}
              defaultLastName={profile.lastName}
              defaultPhone={profile.phone}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent className="mt-0 outline-none" value="workspace">
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>How your organization shows up in the product.</CardDescription>
          </CardHeader>
          <CardContent>
            <WorkspaceSettingsForm
              defaultBusinessName={workspace.businessName}
              defaultOrganizationSize={workspace.organizationSize}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent className="mt-0 outline-none" value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Color theme for the interface.</CardDescription>
          </CardHeader>
          <CardContent>
            <AppearanceSettingsForm themeId={themeId} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent className="mt-0 flex flex-col gap-6 outline-none" value="privacy">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what we email you about.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 opacity-60">
              <Checkbox id="notif-product" disabled checked={false} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="notif-product" className="cursor-not-allowed">
                  Product updates
                </Label>
                <p className="text-sm text-muted-foreground">Coming soon.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 opacity-60">
              <Checkbox id="notif-weekly" disabled checked={false} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="notif-weekly" className="cursor-not-allowed">
                  Weekly digest
                </Label>
                <p className="text-sm text-muted-foreground">Coming soon.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 opacity-60">
              <Checkbox id="notif-mentions" disabled checked={false} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="notif-mentions" className="cursor-not-allowed">
                  Mentions and comments
                </Label>
                <p className="text-sm text-muted-foreground">Coming soon.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy and data</CardTitle>
            <CardDescription>Your data and export options.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <Link className="text-primary underline-offset-4 hover:underline" href="#">
              Privacy policy (placeholder)
            </Link>
            <p className="text-muted-foreground">Export your data — coming soon.</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">Danger zone</CardTitle>
            <CardDescription>Irreversible actions for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Account deletion is not available yet. Contact support if you need help.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
