import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/data/store";

export async function GET() {
  const user = getCurrentUser();
  return NextResponse.json({ user });
}
