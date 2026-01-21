"use client";

import { FlashcardSet } from "@/lib/types";
import { Link2, Copy, Share } from "lucide-react";
import { useState } from "react";

interface SharingPanelProps {
  sets: FlashcardSet[];
  shareLinks: Record<string, string>;
}

export default function SharingPanel({ sets, shareLinks }: SharingPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyLink = async (setId: string) => {
    const link = shareLinks[setId];
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(setId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Shareable Study Sets</h2>
            <p className="text-sm text-slate-300">Generate invite links, control visibility, and embed in classes.</p>
          </div>
          <Share className="h-6 w-6 text-cyan-300" />
        </div>
        <div className="mt-4 space-y-4 text-sm text-slate-200">
          {sets.map((set) => (
            <div key={set.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{set.title}</p>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{set.visibility.toUpperCase()}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyLink(set.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs"
                >
                  <Copy className="h-4 w-4" /> Copy link
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                <Link2 className="h-4 w-4 text-cyan-300" />
                {shareLinks[set.id]}
                {copied === set.id && <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-100">Copied</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Distribution Modes</p>
        <ul className="mt-4 space-y-2">
          <li>• Public gallery listing with analytics</li>
          <li>• Classroom-limited share codes</li>
          <li>• Export to PDF or slides</li>
        </ul>
      </aside>
    </div>
  );
}
