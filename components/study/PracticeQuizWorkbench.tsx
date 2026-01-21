"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FlashcardSet, UserProfile } from "@/lib/types";
import { Timer, BarChart3, Gauge, BrainCircuit } from "lucide-react";

interface PracticeQuizWorkbenchProps {
  sets: FlashcardSet[];
  user: UserProfile;
}

export default function PracticeQuizWorkbench({ sets, user }: PracticeQuizWorkbenchProps) {
  const [selectedSet, setSelectedSet] = useState(sets[0]?.id ?? "");
  const [results, setResults] = useState<any | null>(null);

  const mutation = useMutation({
    mutationFn: async (payload: { questionId: string; correct: boolean; responseTime: number }[]) => {
      const response = await fetch("/api/data/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, flashcardSetId: selectedSet, answers: payload })
      });
      if (!response.ok) throw new Error("Unable to grade quiz");
      return response.json();
    },
    onSuccess: (data) => setResults(data)
  });

  const handleSimulateQuiz = () => {
    const set = sets.find((entry) => entry.id === selectedSet);
    if (!set) return;
    const answers = set.questions.slice(0, 10).map((question) => ({
      questionId: question.id,
      correct: Math.random() > 0.3,
      responseTime: 4000 + Math.random() * 4000
    }));
    mutation.mutate(answers);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Practice Quiz Lab</h2>
            <p className="text-sm text-slate-300">Run adaptive quizzes with AI explanations for misses.</p>
          </div>
          <Gauge className="h-6 w-6 text-cyan-300" />
        </div>
        <div className="mt-4">
          <label className="text-xs uppercase tracking-[0.32em] text-slate-400">Choose source</label>
          <select
            value={selectedSet}
            onChange={(event) => setSelectedSet(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm"
          >
            {sets.map((set) => (
              <option key={set.id} value={set.id} className="bg-slate-900">
                {set.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-200">
          <p>Configure quiz parameters:</p>
          <ul className="mt-4 space-y-2 text-xs text-slate-400">
            <li>• Adaptive difficulty enabled via spaced data</li>
            <li>• AI explains incorrect responses with references</li>
            <li>• Analytics sync to daily goals</li>
          </ul>
          <button
            type="button"
            onClick={handleSimulateQuiz}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white"
            disabled={mutation.isPending}
          >
            <BrainCircuit className="h-4 w-4" /> Run Smart Quiz
          </button>
        </div>
      </section>
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-300">Analytics</h3>
          <BarChart3 className="h-5 w-5 text-emerald-300" />
        </div>
        {results ? (
          <div className="mt-4 space-y-3 text-sm">
            <p>Accuracy: <strong>{Math.round(results.accuracy * 100)}%</strong></p>
            <p>Avg Response Time: <strong>{Math.round(results.averageTime / 1000)}s</strong></p>
            <p>Curve Index: <strong>{results.difficultyCurve.map((value: number) => value.toFixed(2)).join(", ")}</strong></p>
            <p>AI Insight: <em>Focus upcoming reviews on concepts with lower confidence spikes.</em></p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-300">Run a quiz to populate insights. Analytics updates in real-time.</p>
        )}
      </aside>
    </div>
  );
}
