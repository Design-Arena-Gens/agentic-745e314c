"use client";

import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { useMemo } from "react";

async function fetchActivity(userId: string) {
  const res = await fetch(`/api/analytics/activity?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to load analytics");
  return res.json() as Promise<{
    data: { date: string; studyMinutes: number; accuracy: number; xpEarned: number }[];
  }>;
}

interface ActivityHeatmapProps {
  userId: string;
}

export default function ActivityHeatmap({ userId }: ActivityHeatmapProps) {
  const { data } = useQuery({
    queryKey: ["activity", userId],
    queryFn: () => fetchActivity(userId)
  });

  const heatmap = useMemo(() => {
    const days = Array.from({ length: 14 }).map((_, index) => {
      const entry = data?.data[index];
      const intensity = entry ? Math.min(1, entry.studyMinutes / 120) : 0;
      return { index, entry, intensity };
    });
    return days.reverse();
  }, [data]);

  return (
    <div className="card rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Study Pulse</h2>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Last 14 days</p>
        </div>
        <CalendarDays className="h-6 w-6 text-sky-300" />
      </div>
      <div className="mt-6 grid grid-cols-7 gap-3">
        {heatmap.map(({ index, entry, intensity }) => (
          <div key={index} className="flex min-h-[80px] flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="h-2 w-full rounded-full bg-slate-900">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{ width: `${Math.round(intensity * 100)}%` }}
              />
            </div>
            <div className="text-xs text-slate-300">
              <p>{entry ? `${entry.studyMinutes}m` : "0m"}</p>
              <p>{entry ? `${Math.round(entry.accuracy * 100)}%` : "--"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
