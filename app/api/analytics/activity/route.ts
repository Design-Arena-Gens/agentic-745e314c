import { NextResponse } from "next/server";
import { getAnalytics } from "@/lib/data/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const data = getAnalytics(userId).map((entry) => ({
    date: entry.date,
    studyMinutes: entry.studyMinutes,
    accuracy: entry.accuracy,
    xpEarned: entry.xpEarned,
    gamesPlayed: entry.gamesPlayed
  }));

  return NextResponse.json({ data });
}
