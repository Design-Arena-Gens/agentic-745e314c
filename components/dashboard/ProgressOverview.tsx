"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ProgressRecord } from "@/lib/types";
import { useMemo } from "react";

interface ProgressOverviewProps {
  progress: ProgressRecord[];
}

const masteryPalette = ["#0ea5e9", "#818cf8", "#f97316", "#10b981"];

export default function ProgressOverview({ progress }: ProgressOverviewProps) {
  const chartData = useMemo(
    () =>
      progress.map((record, index) => ({
        name: index === 0 ? "Core" : `Set ${index + 1}`,
        mastery: Math.round(record.mastery * 100),
        streak: record.streak,
        xp: record.totalXP
      })),
    [progress]
  );

  return (
    <div className="card rounded-3xl border border-white/10 p-6 text-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Mastery Trajectory</h2>
          <p className="text-sm text-slate-400">Adaptive spaced repetition and test analytics blending over time.</p>
        </div>
        <div className="flex gap-2 text-xs uppercase tracking-widest text-slate-500">
          <span className="rounded-full bg-sky-500/20 px-3 py-1 text-sky-200">Mastery</span>
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-violet-200">Streak</span>
        </div>
      </div>
      <div className="mt-6 h-64 rounded-2xl border border-white/5 bg-slate-900/60 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 12, right: 24, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
            <XAxis dataKey="name" stroke="rgba(148,163,184,0.6)" tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(148,163,184,0.6)" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "rgba(15,23,42,0.95)", borderRadius: 16, border: "1px solid rgba(148,163,184,0.2)" }}
              itemStyle={{ color: "#e2e8f0" }}
            />
            <Area type="monotone" dataKey="mastery" stroke="#38bdf8" fillOpacity={1} fill="url(#colorMastery)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {progress.map((record, index) => (
          <div key={record.flashcardSetId} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Set {index + 1}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{Math.round(record.mastery * 100)}%</h3>
            <p className="text-sm text-slate-400">Streak {record.streak}d · XP {record.totalXP}</p>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500"
                style={{ width: `${Math.round(record.mastery * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
