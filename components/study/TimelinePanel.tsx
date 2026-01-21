"use client";

import { useMemo, useState } from "react";
import { FlashcardSet, TimelineEvent } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { History } from "lucide-react";

async function fetchTimeline(setId: string) {
  const response = await fetch(`/api/data/timeline?setId=${setId}`);
  if (!response.ok) throw new Error("Failed to load timeline");
  return response.json() as Promise<{ events: TimelineEvent[] }>;
}

interface TimelinePanelProps {
  sets: FlashcardSet[];
}

export default function TimelinePanel({ sets }: TimelinePanelProps) {
  const [activeSetId, setActiveSetId] = useState(sets[0]?.id ?? "");
  const { data } = useQuery({
    queryKey: ["timeline", activeSetId],
    queryFn: () => fetchTimeline(activeSetId),
    enabled: Boolean(activeSetId)
  });

  const events = useMemo(() => data?.events ?? [], [data]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">AI Timelines</h2>
          <p className="text-sm text-slate-300">Visualize processes and chronologies with auto-generated context.</p>
        </div>
        <History className="h-6 w-6 text-amber-300" />
      </div>
      <div className="mt-4">
        <label className="text-xs uppercase tracking-[0.32em] text-slate-400">Select Set</label>
        <select
          value={activeSetId}
          onChange={(event) => setActiveSetId(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm"
        >
          {sets.map((set) => (
            <option key={set.id} value={set.id} className="bg-slate-900">
              {set.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 space-y-3">
        {events.map((event, index) => (
          <div key={event.id} className="relative rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="absolute left-0 top-1/2 h-px w-8 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>{event.era}</span>
              <span>{new Date(event.timestamp).toLocaleDateString()}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">{event.label}</h3>
            <p className="mt-2 text-sm text-slate-300">{event.description}</p>
          </div>
        ))}
        {events.length === 0 && <p className="text-sm text-slate-400">No timeline data yet. Generate from guides to populate.</p>}
      </div>
    </div>
  );
}
