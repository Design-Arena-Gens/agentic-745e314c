import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { registerUser, authenticate } from "@/lib/data/store";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const user = registerUser(name, email, password);
  const session = authenticate(email, password);

  if (!session) {
    return new NextResponse("Unable to begin session", { status: 500 });
  }

  cookies().set("ql_session", session.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return NextResponse.json({ user });
}
