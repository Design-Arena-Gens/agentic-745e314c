import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authenticate } from "@/lib/data/store";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const result = authenticate(email, password);

  if (!result) {
    return new NextResponse("Invalid credentials", { status: 401 });
  }

  cookies().set("ql_session", result.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return NextResponse.json(result.user);
}
