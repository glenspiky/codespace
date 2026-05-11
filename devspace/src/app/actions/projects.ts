"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(data: {
  name: string;
  description?: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  await prisma.project.create({
    data: {
      name: data.name,
      userId: session.user.id,
      // description: data.description, // Ensure description is in your schema
    },
  });

  revalidatePath("/projects");
  redirect("/projects");
}
