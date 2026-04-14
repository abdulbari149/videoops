import { auth } from "@/auth";

export async function getSessionUserId(): Promise<string | undefined> {
  const session = await auth();
  return session?.user?.id;
}
