"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma"; // Make sure your prisma client is exported from here
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSnippet(formData: {
  title: string;
  code: string;
  language: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  // Save to MongoDB via Prisma
  await prisma.snippet.create({
    data: {
      title: formData.title,
      code: formData.code,
      language: formData.language,
      userId: session.user.id, // Linking it to the logged-in user
    },
  });

  // Refresh the dashboard data
  revalidatePath("/dashboard");
  revalidatePath("/snippets");

  // Send the user back to the dashboard
  redirect("/dashboard");
}
