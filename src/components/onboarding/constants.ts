import { OrganizationSize } from "@/generated/prisma/enums";

export const STEP_LABELS = ["Personal", "Business", "Appearance"] as const;

export const ORG_OPTIONS: {
  value: (typeof OrganizationSize)[keyof typeof OrganizationSize];
  label: string;
}[] = [
  { value: OrganizationSize.SOLO, label: "Just me" },
  { value: OrganizationSize.FROM_2_TO_10, label: "2–10 people" },
  { value: OrganizationSize.FROM_11_TO_50, label: "11–50 people" },
  { value: OrganizationSize.FROM_51_TO_200, label: "51–200 people" },
  { value: OrganizationSize.OVER_200, label: "201+ people" },
];

export const HEAR_OPTIONS = [
  "Search or AI assistant",
  "Social media",
  "Friend or colleague",
  "Podcast or video",
  "Blog or newsletter",
  "Other",
] as const;

export type HearOption = (typeof HEAR_OPTIONS)[number];

export function parseInitialHearAbout(saved: string): {
  selected: HearOption | null;
  otherDetail: string;
} {
  const t = saved.trim();
  if (!t) return { selected: null, otherDetail: "" };
  if (t.startsWith("Other:")) {
    return {
      selected: "Other",
      otherDetail: t.replace(/^Other:\s*/i, "").trim(),
    };
  }
  if ((HEAR_OPTIONS as readonly string[]).includes(t)) {
    return { selected: t as HearOption, otherDetail: "" };
  }
  return { selected: "Other", otherDetail: t };
}
