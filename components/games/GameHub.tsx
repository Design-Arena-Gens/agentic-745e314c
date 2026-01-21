"use client";

import { useState } from "react";
import { GameDefinition, UserProfile } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import GameCanvas from "@/components/games/GameCanvas";
import { Trophy, Lock, Sword, Gamepad2 } from "lucide-react";
import { GameState } from "@/lib/games/gameEngine";

interface GameHubProps {
  user: UserProfile;
  games: GameDefinition[];
}

export default function GameHub({ user, games }: GameHubProps) {
  const [activeGame, setActiveGame] = useState<GameDefinition | null>(games[0] ?? null);
  const mutation = useMutation({
    mutationFn: async (gameId: string) => {
      const response = await fetch(`/api/games/launch?gameId=${gameId}`);
      if (!response.ok) throw new Error("Failed to launch game");
      return response.json() as Promise<{ state: GameState; definition: GameDefinition }>;
    }
  });

  const tierRank = { free: 0, plus: 1, pro: 2 } as const;

  return (
    <div className="min-h-screen pattern-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Arcade</p>
              <h1 className="text-3xl font-semibold text-white">25 games connected to your mastery progression</h1>
              <p className="text-sm text-slate-300">Earn XP, cosmetics, and analytics as you compete across tower defense, rhythm, RPGs, and more.</p>
            </div>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <Gamepad2 className="h-5 w-5 text-cyan-300" />
              Tier access: {user.tier.toUpperCase()}
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {games.map((game) => {
              const unlocked = tierRank[user.tier] >= tierRank[game.minTier];
              return (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => unlocked && setActiveGame(game)}
                  className={`rounded-3xl border border-white/10 p-5 text-left transition ${
                    unlocked ? "bg-white/10 hover:border-cyan-400/40" : "bg-black/20 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-400">
                    <span>{game.mode}</span>
                    <span>{game.minTier.toUpperCase()}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-white">{game.name}</h2>
                  <p className="mt-2 text-sm text-slate-300">{game.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                    {game.mechanics.map((mechanic) => (
                      <span key={mechanic} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {mechanic}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-cyan-200">
                    {unlocked ? <Sword className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    {unlocked ? "Launch" : "Upgrade tier"}
                  </div>
                </button>
              );
            })}
          </section>

          {activeGame && (
            <GameCanvas
              key={activeGame.id}
              definition={activeGame}
              mutation={mutation}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
}
