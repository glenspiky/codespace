"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Fetches all projects belonging to the current user.
 * Used for populating dropdowns and selection menus.
 */
export async function getProjects() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return [];
  }

  return await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Creates a new project workspace.
 */
export async function createProject(data: {
  name: string;
  description?: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Security check: ensure the user is authenticated
  if (!session || !session.user) {
    throw new Error("Unauthorized: You must be logged in to create a project.");
  }

  try {
    await prisma.project.create({
      data: {
        name: data.name,
        userId: session.user.id,
        // Since we updated the schema to include updatedAt/createdAt,
        // Prisma handles those automatically.
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to initialize project workspace.");
  }

  // Clear the cache so the projects list updates instantly
  revalidatePath("/projects");

  // Redirect the user back to the main dashboard
  redirect("/projects");
}
