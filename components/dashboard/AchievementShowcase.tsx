"use client";

import { Trophy, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

async function fetchAchievements() {
  const res = await fetch("/api/data/achievements");
  if (!res.ok) throw new Error("Failed to load achievements");
  return res.json() as Promise<{ achievements: { id: string; name: string; description: string; icon: string; rarity: string }[] }>;
}

export default function AchievementShowcase() {
  const { data } = useQuery({ queryKey: ["achievements"], queryFn: fetchAchievements });

  return (
    <div className="card rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Achievements</h2>
        <Trophy className="h-6 w-6 text-amber-300" />
      </div>
      <div className="mt-4 space-y-3 text-sm text-slate-200">
        {data?.achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div>
              <p className="font-semibold">{achievement.name}</p>
              <p className="text-xs text-slate-300">{achievement.description}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-amber-200">
              <Star className="h-4 w-4" /> {achievement.rarity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
