"use client";

import { useMemo, useState } from "react";
import { StudyGuide } from "@/lib/types";
import { motion } from "framer-motion";
import { NotebookPen, BookCopy } from "lucide-react";

interface StudyGuidePanelProps {
  guides: StudyGuide[];
}

export default function StudyGuidePanel({ guides }: StudyGuidePanelProps) {
  const [activeGuideId, setActiveGuideId] = useState(guides[0]?.id ?? "");
  const activeGuide = useMemo(() => guides.find((guide) => guide.id === activeGuideId), [guides, activeGuideId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">AI Study Guides</h2>
            <p className="text-sm text-slate-300">Summaries, key insights, misconceptions, and real-world anchors.</p>
          </div>
          <NotebookPen className="h-6 w-6 text-cyan-200" />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {guides.map((guide) => (
            <button
              type="button"
              key={guide.id}
              onClick={() => setActiveGuideId(guide.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                guide.id === activeGuideId ? "bg-cyan-500/40" : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              {guide.title}
            </button>
          ))}
        </div>
        {activeGuide && (
          <motion.div
            key={activeGuide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-6"
          >
            <article className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm leading-relaxed text-slate-200">
              <p className="text-slate-200/90">{activeGuide.summary}</p>
            </article>
            <div className="grid gap-4 md:grid-cols-2">
              <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200">Key Points</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {activeGuide.keyPoints.map((point, index) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </section>
              <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-200">Examples</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {activeGuide.examples.map((example, index) => (
                    <li key={index}>• {example}</li>
                  ))}
                </ul>
              </section>
            </div>
            <section className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-rose-100">Misconceptions</h3>
              <ul className="mt-3 space-y-2 text-sm text-rose-50/90">
                {activeGuide.misconceptions.map((misconception, index) => (
                  <li key={index}>• {misconception}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-200">Practice Prompts</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {activeGuide.practicePrompts.map((prompt, index) => (
                  <li key={index}>• {prompt}</li>
                ))}
              </ul>
            </section>
          </motion.div>
        )}
      </div>
      <aside className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-slate-900/60 p-6 text-sm text-slate-100">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-slate-200">
          <BookCopy className="h-5 w-5 text-purple-200" />
          Guided Playbook
        </div>
        <p className="mt-4 text-slate-100/90">
          Export guides into classroom assignments, share with teammates, and convert into timeline events with a single click.
        </p>
        <button type="button" className="mt-4 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-100">
          Share Study Guide
        </button>
      </aside>
    </div>
  );
}
