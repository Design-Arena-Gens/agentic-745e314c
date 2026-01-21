"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DailyChallenge, ExamCountdown, ProgressRecord, UserProfile } from "@/lib/types";
import StreakCard from "@/components/dashboard/StreakCard";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import DailyChallengeCard from "@/components/dashboard/DailyChallengeCard";
import ExamCountdownCard from "@/components/dashboard/ExamCountdownCard";
import DashboardNav from "@/components/layout/DashboardNav";
import GamificationStats from "@/components/dashboard/GamificationStats";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import AchievementShowcase from "@/components/dashboard/AchievementShowcase";

interface DashboardShellProps {
  user: UserProfile;
  progress: ProgressRecord[];
  challenge: DailyChallenge;
  exams: ExamCountdown[];
}

const heroCards = [
  {
    id: "study",
    title: "Study Hub",
    description: "Flashcards, notes, guides, timelines, and adaptive practice.",
    href: "/study",
    gradient: "from-cyan-500/30 via-blue-500/20 to-purple-500/40"
  },
  {
    id: "games",
    title: "Game Arcade",
    description: "25 unique mastery games mapped to your current goals.",
    href: "/games",
    gradient: "from-amber-500/30 via-rose-500/20 to-indigo-500/40"
  },
  {
    id: "tests",
    title: "Practice Lab",
    description: "Timed tests, analytics, retakes, and AI breakdowns.",
    href: "/study/tests",
    gradient: "from-emerald-500/20 via-blue-500/20 to-sky-500/30"
  }
];

export default function DashboardShell({ user, progress, challenge, exams }: DashboardShellProps) {
  const [activeCard, setActiveCard] = useState(heroCards[0].id);

  const tierMeta = useMemo(() => {
    switch (user.tier) {
      case "free":
        return { color: "bg-slate-700", label: "Free Tier", tag: "caps" };
      case "plus":
        return { color: "bg-indigo-600", label: "Plus Tier", tag: "infinite" };
      case "pro":
        return { color: "bg-gradient-to-r from-amber-500 to-pink-500", label: "Pro Tier", tag: "priority" };
      default:
        return { color: "bg-slate-700", label: "Free Tier", tag: "caps" };
    }
  }, [user.tier]);

  return (
    <div className="min-h-screen pattern-bg">
      <DashboardNav user={user} />
      <main className="px-6 pb-24">
        <section className="py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.28em]">
                <span className={`${tierMeta.color} text-white rounded-full px-3 py-1 text-xs`}>{tierMeta.label}</span>
                <span>Adaptive study intelligence engaged</span>
              </div>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">
                Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent">{user.name}</span>
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Continue your mastery journey. Your streak is alive, the arcade is humming, and your AI guides queued the next concepts to conquer.
              </p>
            </div>
            <StreakCard user={user} />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {heroCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => setActiveCard(card.id)}
                className={`card relative overflow-hidden border border-white/10 bg-gradient-to-br ${card.gradient} p-6`}
              >
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-semibold text-white">{card.title}</h2>
                  <p className="text-sm text-slate-200/80">{card.description}</p>
                  <Link
                    href={card.href}
                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-white/20"
                  >
                    Enter {card.title} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <ProgressOverview progress={progress} />
          <DailyChallengeCard challenge={challenge} />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.7fr_1.3fr]">
          <ActivityHeatmap userId={user.id} />
          <div className="grid gap-6">
            <GamificationStats user={user} />
            <AchievementShowcase />
            <ExamCountdownCard exams={exams} />
          </div>
        </section>
      </main>
    </div>
  );
}
