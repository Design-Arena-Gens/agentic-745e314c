"use client";

import { useState } from "react";
import { FlashcardSet } from "@/lib/types";
import { Clock, Zap, Brain } from "lucide-react";

interface SpacedReviewPanelProps {
  cards: {
    questionId: string;
    interval: number;
    dueDate: string;
    easinessFactor: number;
    repetitions: number;
  }[];
  sets: FlashcardSet[];
}

export default function SpacedReviewPanel({ cards, sets }: SpacedReviewPanelProps) {
  const [visibleCount, setVisibleCount] = useState(8);

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Spaced Repetition Queue</h2>
            <p className="text-sm text-slate-300">Prioritized cards ready for review. AI adjusts intervals based on performance.</p>
          </div>
          <Brain className="h-6 w-6 text-emerald-300" />
        </div>
        <div className="mt-6 space-y-4">
          {cards.slice(0, visibleCount).map((card) => {
            const set = sets.find((flashcardSet) => flashcardSet.questions.some((q) => q.id === card.questionId));
            const question = set?.questions.find((q) => q.id === card.questionId);
            if (!question || !set) return null;
            return (
              <div key={card.questionId} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex flex-wrap items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-400">
                  <span>{set.title}</span>
                  <span>Interval {card.interval}d · EF {card.easinessFactor.toFixed(2)}</span>
                </div>
                <p className="mt-3 text-sm text-slate-200">{question.prompt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <Clock className="h-4 w-4 text-cyan-300" /> Due {new Date(card.dueDate).toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <Zap className="h-4 w-4 text-emerald-300" /> Repetitions {card.repetitions}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {cards.length > visibleCount && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 5)}
            className="mt-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200"
          >
            Load more
          </button>
        )}
      </section>
      <aside className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-6 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Adaptive Engine</p>
        <p className="mt-4 text-slate-100">
          Cards are slotted into spaced repetition waves using SM-2 tuned with AI heuristics. Difficulty scaling factors are synced with quiz feedback to accelerate mastery.
        </p>
        <ul className="mt-5 space-y-2 text-xs text-slate-300">
          <li>• Intervals auto-adjust with confidence scores</li>
          <li>• Prioritize high-leverage concepts nearing exams</li>
          <li>• Offline queue caches next 50 cards for travel mode</li>
        </ul>
      </aside>
    </div>
  );
}
