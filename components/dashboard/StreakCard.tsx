"use client";

import { Trophy, Flame, Target, Medal } from "lucide-react";
import { UserProfile } from "@/lib/types";

interface StreakCardProps {
  user: UserProfile;
}

export default function StreakCard({ user }: StreakCardProps) {
  return (
    <div className="card flex flex-col gap-4 rounded-3xl border border-white/10 p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-300">Mastery Streak</p>
          <h3 className="mt-2 text-4xl font-semibold">{user.streak} days</h3>
        </div>
        <Flame className="h-10 w-10 text-amber-400" />
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-xs uppercase text-slate-400">
            <Trophy className="h-4 w-4 text-emerald-400" />
            XP
          </div>
          <p className="mt-3 text-xl font-semibold">{user.xp.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-xs uppercase text-slate-400">
            <Medal className="h-4 w-4 text-sky-400" />
            Longest
          </div>
          <p className="mt-3 text-xl font-semibold">{user.longestStreak}d</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-xs uppercase text-slate-400">
            <Target className="h-4 w-4 text-pink-400" />
            Currency
          </div>
          <p className="mt-3 text-xl font-semibold">{user.currency.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
