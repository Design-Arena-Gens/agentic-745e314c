"use client";

import { UserProfile } from "@/lib/types";
import { Crown, Gift, ShieldCheck, Sword, Zap } from "lucide-react";

interface GamificationStatsProps {
  user: UserProfile;
}

const statBlocks = [
  {
    id: "xp",
    label: "Total XP",
    icon: Zap,
    color: "from-cyan-400/50 via-sky-500/40 to-indigo-500/40"
  },
  {
    id: "currency",
    label: "Quantum Coins",
    icon: Gift,
    color: "from-amber-400/40 via-pink-500/30 to-rose-500/40"
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: Crown,
    color: "from-violet-500/40 via-purple-500/30 to-fuchsia-500/40"
  },
  {
    id: "cosmetics",
    label: "Cosmetics",
    icon: ShieldCheck,
    color: "from-emerald-400/40 via-teal-500/30 to-cyan-500/40"
  }
];

export default function GamificationStats({ user }: GamificationStatsProps) {
  return (
    <div className="card rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Gamification Profile</h2>
        <Sword className="h-6 w-6 text-amber-300" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {statBlocks.map((block) => {
          const Icon = block.icon;
          const value =
            block.id === "xp"
              ? user.xp.toLocaleString()
              : block.id === "currency"
                ? user.currency.toLocaleString()
                : block.id === "achievements"
                  ? user.achievements.length
                  : user.unlockedCosmetics.length;
          return (
            <div
              key={block.id}
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${block.color} p-4`}
            >
              <Icon className="absolute right-4 top-4 h-6 w-6 text-white/70" />
              <p className="text-xs uppercase tracking-[0.32em] text-white/70">{block.label}</p>
              <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
