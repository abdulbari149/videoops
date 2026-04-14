import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_BYTES = 2 * 1024 * 1024;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Missing file" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "Please upload an image file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Image must be 2MB or smaller" }, { status: 400 });
  }

  const ext =
    path.extname(file.name).toLowerCase().replace(/[^.a-z0-9]/g, "") || ".png";
  const allowed = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];
  const safeExt = allowed.includes(ext) ? ext : ".png";

  const dir = path.join(process.cwd(), "public", "uploads", "logos");
  await mkdir(dir, { recursive: true });
  const filename = `${session.user.id}-${Date.now()}${safeExt}`;
  const diskPath = path.join(dir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(diskPath, buffer);

  const publicPath = `/uploads/logos/${filename}`;
  await prisma.user.update({
    where: { id: session.user.id },
    data: { logoUrl: publicPath },
  });

  return Response.json({ url: publicPath });
}
