import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().set("ql_session", "", { maxAge: 0, path: "/" });
  return NextResponse.json({ ok: true });
}
