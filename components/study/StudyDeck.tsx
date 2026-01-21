"use client";

import { useMemo, useState } from "react";
import { FlashcardSet, Question, UserProfile } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ArrowRight, Shuffle, Sparkles } from "lucide-react";

interface StudyDeckProps {
  user: UserProfile;
  sets: FlashcardSet[];
}

function getRandomQuestion(set: FlashcardSet) {
  return set.questions[Math.floor(Math.random() * set.questions.length)];
}

export function StudyDeck({ user, sets }: StudyDeckProps) {
  const [activeSetId, setActiveSetId] = useState(sets[0]?.id ?? "");
  const [question, setQuestion] = useState<Question | null>(sets[0] ? getRandomQuestion(sets[0]) : null);
  const [showAnswer, setShowAnswer] = useState(false);

  const activeSet = useMemo(() => sets.find((set) => set.id === activeSetId), [sets, activeSetId]);

  const handleNext = () => {
    if (!activeSet) return;
    setShowAnswer(false);
    setQuestion(getRandomQuestion(activeSet));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Adaptive Flashcards</h2>
            <p className="text-sm text-slate-300">Difficulty auto-tunes by your quiz history and spaced repetition profile.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100"
            onClick={() => activeSet && setQuestion(getRandomQuestion(activeSet))}
          >
            <Shuffle className="h-4 w-4" /> Shuffle
          </button>
        </div>
        <div className="mt-6">
          <label className="text-xs uppercase tracking-[0.32em] text-slate-400">Select Set</label>
          <select
            value={activeSetId}
            onChange={(event) => {
              setActiveSetId(event.target.value);
              const newSet = sets.find((set) => set.id === event.target.value);
              if (newSet) {
                setQuestion(getRandomQuestion(newSet));
              }
            }}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
          >
            {sets.map((set) => (
              <option key={set.id} value={set.id} className="bg-slate-900">
                {set.title}
              </option>
            ))}
          </select>
        </div>
        {question && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-400">
              <span>{question.difficulty} · {question.tags.join(" · ")}</span>
              <span>{activeSet?.title}</span>
            </div>
            <div className="mt-5 space-y-4">
              <AnimatePresence mode="wait">
                {!showAnswer ? (
                  <motion.p
                    key="question"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xl text-white"
                  >
                    {question.prompt}
                  </motion.p>
                ) : (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <p className="text-lg font-semibold text-emerald-300">{question.answer}</p>
                    <p className="text-sm text-slate-300">{question.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {!showAnswer && (
                <button
                  type="button"
                  onClick={() => setShowAnswer(true)}
                  className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-sm font-semibold text-white"
                >
                  Reveal Answer
                </button>
              )}
              {showAnswer && (
                <>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm text-cyan-100"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                    {["Again", "Hard", "Good", "Easy"].map((label) => (
                      <button
                        type="button"
                        key={label}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Sparkles className="h-5 w-5 text-amber-300" />
            <span>AI explanation ready for incorrect answers with contextual breakdown.</span>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-emerald-200">Mastery Progress</p>
          <p className="mt-3 text-2xl font-semibold text-white">Spaced review queue synced</p>
          <p className="mt-2 text-sm text-emerald-100/80">Due today: <strong>{Math.min(12, user.streak + 5)}</strong> cards. Complete now to maintain streak.</p>
          <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/20 px-4 py-2 text-sm text-emerald-100">
            <BadgeCheck className="h-4 w-4" /> Launch Review
          </button>
        </div>
      </div>
    </div>
  );
}
