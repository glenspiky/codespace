"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createSnippet(formData: {
  title: string;
  code: string;
  language: string;
  projectId?: string; // Optional: can be a standalone snippet
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  await prisma.snippet.create({
    data: {
      title: formData.title,
      code: formData.code,
      language: formData.language,
      userId: session.user.id,
      // If projectId is provided, link it. If "none" or undefined, leave null.
      projectId:
        formData.projectId && formData.projectId !== "none"
          ? formData.projectId
          : null,
    },
  });

  revalidatePath("/snippets");
  revalidatePath("/projects");
  redirect("/snippets");
}
