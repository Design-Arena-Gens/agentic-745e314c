"use client";

import { differenceInDays, differenceInHours, format } from "date-fns";
import { AlarmClock, Calendar } from "lucide-react";
import { ExamCountdown } from "@/lib/types";

interface ExamCountdownCardProps {
  exams: ExamCountdown[];
}

export default function ExamCountdownCard({ exams }: ExamCountdownCardProps) {
  return (
    <div className="card rounded-3xl border border-sky-500/20 bg-sky-500/10 p-6 text-sky-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-sky-200">Exam Countdown</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Upcoming assessments</h2>
        </div>
        <Calendar className="h-8 w-8 text-sky-300" />
      </div>
      <div className="mt-4 space-y-4">
        {exams.map((exam) => {
          const date = new Date(exam.date);
          const days = differenceInDays(date, new Date());
          const hours = differenceInHours(date, new Date()) % 24;
          return (
            <div key={exam.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold text-white">{exam.title}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-200">{exam.subject}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-sky-100/80">
                  <AlarmClock className="h-4 w-4" />
                  {days}d {hours}h
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-sky-100/80">
                <span>{exam.notes}</span>
                <span>{format(date, "MMM dd, yyyy")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
