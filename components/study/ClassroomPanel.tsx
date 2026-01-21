"use client";

import { ClassRoom, FlashcardSet } from "@/lib/types";
import { Users2, ClipboardCheck, Share2 } from "lucide-react";

interface ClassroomPanelProps {
  classrooms: ClassRoom[];
  sets: FlashcardSet[];
}

export default function ClassroomPanel({ classrooms, sets }: ClassroomPanelProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Classroom Control</h2>
            <p className="text-sm text-slate-300">Teacher-mode assignments, join codes, and cohort analytics.</p>
          </div>
          <Users2 className="h-6 w-6 text-cyan-300" />
        </div>
        <div className="mt-4 space-y-4 text-sm text-slate-200">
          {classrooms.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-300">
              No classrooms yet. Activate teacher mode to create cohorts and invite learners.
            </div>
          )}
          {classrooms.map((room) => (
            <div key={room.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{room.name}</p>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Join code {room.joinCode}</p>
                </div>
                <Share2 className="h-5 w-5 text-cyan-200" />
              </div>
              <p className="mt-3 text-xs text-slate-400">Members: {room.memberIds.length}</p>
              <div className="mt-4 space-y-3">
                {room.assignments.map((assignment) => {
                  const set = sets.find((s) => s.id === assignment.setId);
                  return (
                    <div key={assignment.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-400">
                        <span>{assignment.title}</span>
                        <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-200">{assignment.description}</p>
                      <p className="mt-2 text-xs text-slate-400">Linked set: {set?.title ?? "Unknown"}</p>
                      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">
                        <ClipboardCheck className="h-4 w-4" /> Completion {Object.values(assignment.completion).filter(Boolean).length}/{Object.keys(assignment.completion).length}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Teacher Toolkit</p>
        <ul className="mt-4 space-y-2">
          <li>• Auto-grade quizzes and sync to LMS exports</li>
          <li>• Live monitoring with anti-cheat alerts</li>
          <li>• Assign arcade modes as homework</li>
        </ul>
      </aside>
    </div>
  );
}
