import { NextResponse } from "next/server";
import { getCurrentUser, launchGame, listGameDefinitions, enforceTier } from "@/lib/data/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("gameId");
  if (!gameId) {
    return NextResponse.json({ error: "Missing game" }, { status: 400 });
  }

  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const definition = listGameDefinitions().find((game) => game.id === gameId);
  if (!definition) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  const tierRank = { free: 0, plus: 1, pro: 2 } as const;
  if (tierRank[user.tier] < tierRank[definition.minTier] && user.role !== "admin") {
    return NextResponse.json({ error: "Upgrade tier" }, { status: 403 });
  }

  const state = launchGame(user.id, gameId);
  return NextResponse.json({ state, definition });
}
