import { NextResponse } from "next/server";
import { validateAdmin } from "@/lib/data/store";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!password) {
    return NextResponse.json({ error: "Missing" }, { status: 400 });
  }
  if (!validateAdmin(password)) {
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
