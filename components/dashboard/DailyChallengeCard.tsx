"use client";

import { DailyChallenge } from "@/lib/types";
import { useAuth } from "@/lib/hooks/AuthContext";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
}

export default function DailyChallengeCard({ challenge }: DailyChallengeCardProps) {
  const { user } = useAuth();
  const progress = user?.dailyChallengeStatus;

  return (
    <div className="card flex flex-col gap-4 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-sky-500/10 p-6 text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-200">Daily Challenge</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{challenge.title}</h2>
        </div>
        <Sparkles className="h-8 w-8 text-amber-300" />
      </div>
      <p className="text-sm text-amber-100/80">{challenge.description}</p>
      <div className="space-y-3">
        {challenge.tasks.map((task) => {
          const completed = progress?.completed || task.progress >= task.target;
          return (
            <div key={task.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span className="uppercase tracking-[0.22em] text-amber-200">{task.type}</span>
                <span>
                  {Math.min(task.progress, task.target)} / {task.target}
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-400"
                  style={{ width: `${(Math.min(task.progress, task.target) / task.target) * 100}%` }}
                />
              </div>
              {completed && (
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-emerald-200">
                  <CheckCircle2 className="h-4 w-4" /> Completed
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm">
        <div className="text-amber-100">
          Reward: <strong>{challenge.reward.xp} XP</strong> · <strong>{challenge.reward.currency} QC</strong>
          {challenge.reward.cosmetic && <span> · Cosmetic: {challenge.reward.cosmetic}</span>}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 text-xs uppercase tracking-[0.32em] text-amber-100 transition hover:bg-amber-400/30"
        >
          Boost <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
