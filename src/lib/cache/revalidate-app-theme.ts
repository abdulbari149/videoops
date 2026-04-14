import { revalidatePath } from "next/cache";

export function revalidateAppTheme() {
  revalidatePath("/", "layout");
  revalidatePath("/dashboard");
}
