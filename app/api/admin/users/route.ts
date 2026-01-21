import { NextResponse } from "next/server";
import { getCurrentUser, listUsers } from "@/lib/data/store";

export async function GET() {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = listUsers();
  return NextResponse.json({ users });
}
