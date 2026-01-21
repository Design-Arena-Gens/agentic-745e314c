import { NextResponse } from "next/server";
import { elevateTier, getCurrentUser } from "@/lib/data/store";

export async function POST(request: Request) {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, tier } = await request.json();
  if (!userId || !tier) {
    return NextResponse.json({ error: "Missing" }, { status: 400 });
  }

  const updated = elevateTier(userId, tier);
  return NextResponse.json({ user: updated });
}
