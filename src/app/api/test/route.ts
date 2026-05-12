
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({
      message: "Connection successful!",
      count: userCount,
    });
  } catch (error) {
    console.error(error); // This will show the real error in your terminal
    return NextResponse.json(
      {
        error: "Connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
