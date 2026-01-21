"use client";

import { useMemo } from "react";
import { UserProfile } from "@/lib/types";
import { CalendarCheck, Target, Compass } from "lucide-react";

interface StudyPlannerPanelProps {
  user: UserProfile;
}

export default function StudyPlannerPanel({ user }: StudyPlannerPanelProps) {
  const plan = useMemo(() => {
    const totalHours = user.preferences.studyGoals.reduce((acc, goal) => acc + goal.hoursPerWeek, 0);
    return {
      totalHours,
      focus: user.preferences.studyGoals.map((goal) => ({
        subject: goal.subject,
        hoursPerWeek: goal.hoursPerWeek,
        target: goal.targetScore,
        examDate: goal.examDate
      }))
    };
  }, [user.preferences.studyGoals]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">AI Study Planner</h2>
            <p className="text-sm text-slate-300">Weekly focus generated from goals, streaks, and upcoming exams.</p>
          </div>
          <Compass className="h-6 w-6 text-emerald-300" />
        </div>
        <div className="mt-6 space-y-4 text-sm text-slate-200">
          {plan.focus.map((item) => (
            <div key={item.subject} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{item.subject}</p>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Target Score {item.target}</p>
                </div>
                <CalendarCheck className="h-5 w-5 text-emerald-300" />
              </div>
              <p className="mt-3 text-sm text-slate-300">Plan {item.hoursPerWeek} hrs/week • Exam {new Date(item.examDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>
      <aside className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-sky-500/10 p-6 text-white">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-emerald-200">
          <Target className="h-5 w-5" /> Focus Map
        </div>
        <p className="mt-4 text-sm text-emerald-100">
          Total weekly commitment: <strong>{plan.totalHours} hrs</strong>. Planner syncs with game arcade to surface modes reinforcing the highlighted subjects, and cascades to daily challenges.
        </p>
      </aside>
    </div>
  );
}
