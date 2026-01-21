"use client";

import { useEffect, useMemo, useState } from "react";
import { PracticeTest, UserProfile } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Timer, Activity, LineChart } from "lucide-react";

async function fetchTests() {
  const res = await fetch("/api/data/tests");
  if (!res.ok) throw new Error("Failed to fetch tests");
  return res.json() as Promise<{ tests: PracticeTest[] }>;
}

async function submitAttempt(payload: {
  testId: string;
  userId: string;
}) {
  const res = await fetch("/api/data/tests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to submit attempt");
  return res.json();
}

interface PracticeTestPanelProps {
  user: UserProfile;
}

export default function PracticeTestPanel({ user }: PracticeTestPanelProps) {
  const { data } = useQuery({ queryKey: ["tests"], queryFn: fetchTests });
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const mutation = useMutation({ mutationFn: submitAttempt });

  const tests = useMemo(() => data?.tests ?? [], [data]);
  const selectedTest = useMemo(
    () => tests.find((test) => test.id === selectedTestId) ?? tests[0],
    [tests, selectedTestId]
  );

  useEffect(() => {
    if (!selectedTestId && tests[0]) {
      setSelectedTestId(tests[0].id);
    }
  }, [tests, selectedTestId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Practice Test Lab</h2>
            <p className="text-sm text-slate-300">Timed sections, analytics, retakes, and AI breakdowns.</p>
          </div>
          <Timer className="h-6 w-6 text-amber-300" />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {tests.map((test) => (
            <button
              key={test.id}
              type="button"
              onClick={() => setSelectedTestId(test.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedTest?.id === test.id ? "bg-amber-400/40" : "bg-white/10 text-slate-200"
              }`}
            >
              {test.title}
            </button>
          ))}
        </div>
        {selectedTest && (
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-300">
              <p>Duration: {selectedTest.durationMinutes} minutes</p>
              <p>Sections: {selectedTest.sections.length}</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                {selectedTest.sections.map((section) => (
                  <li key={section.id}>• {section.title} · Adaptive: {section.adaptive ? "Yes" : "No"}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => selectedTest && mutation.mutate({ testId: selectedTest.id, userId: user.id })}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white"
            >
              <Activity className="h-4 w-4" /> Simulate Attempt
            </button>
          </div>
        )}
      </section>
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-300">Insights</h3>
          <LineChart className="h-5 w-5 text-cyan-300" />
        </div>
        {mutation.data ? (
          <div className="mt-4 space-y-3 text-sm text-slate-200">
            <p>Total Score: <strong>{mutation.data.totalScore}</strong></p>
            <p>Sections: {Object.entries(mutation.data.sectionScores).map(([section, score]: any) => `${section}: ${score}`).join(" · ")}</p>
            <p>Difficulty Shift: {mutation.data.difficultyShifts.map((s: number) => s.toFixed(1)).join(", ")}</p>
            <p>AI Coaching: <em>Focus on sections with highest response variance.</em></p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-300">Complete an attempt to unlock analytics and AI breakdowns.</p>
        )}
      </aside>
    </div>
  );
}
