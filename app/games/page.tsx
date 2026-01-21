import { redirect } from "next/navigation";
import { getCurrentUser, listGameDefinitions, enforceTier } from "@/lib/data/store";
import GameHub from "@/components/games/GameHub";

export default async function GamesPage() {
  const user = getCurrentUser();
  if (!user) redirect("/auth/login");

  const games = listGameDefinitions();
  return <GameHub user={user} games={games} />;
}
