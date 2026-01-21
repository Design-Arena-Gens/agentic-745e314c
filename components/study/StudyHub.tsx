"use client";

import { useState } from "react";
import {
  ClassRoom,
  FlashcardSet,
  NoteDocument,
  NoteFolder,
  StudyGuide,
  UserProfile
} from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { StudyDeck } from "@/components/study/StudyDeck";
import StudyGuidePanel from "@/components/study/StudyGuidePanel";
import TimelinePanel from "@/components/study/TimelinePanel";
import NotesPanel from "@/components/study/NotesPanel";
import SpacedReviewPanel from "@/components/study/SpacedReviewPanel";
import ClassroomPanel from "@/components/study/ClassroomPanel";
import SharingPanel from "@/components/study/SharingPanel";
import IntegrityPanel from "@/components/study/IntegrityPanel";
import AIFlashcardGenerator from "@/components/study/AIFlashcardGenerator";
import PracticeQuizWorkbench from "@/components/study/PracticeQuizWorkbench";
import PracticeTestPanel from "@/components/study/PracticeTestPanel";
import StudyPlannerPanel from "@/components/study/StudyPlannerPanel";

const tabs = [
  { id: "flashcards", label: "Flashcards" },
  { id: "quizzes", label: "Quizzes" },
  { id: "tests", label: "Practice Tests" },
  { id: "guides", label: "Study Guides" },
  { id: "timelines", label: "Timelines" },
  { id: "notes", label: "Notes" },
  { id: "spaced", label: "Spaced Repetition" },
  { id: "classrooms", label: "Classrooms" },
  { id: "sharing", label: "Sharing" },
  { id: "integrity", label: "Integrity" },
  { id: "planner", label: "AI Planner" }
];

interface StudyHubProps {
  user: UserProfile;
  sets: FlashcardSet[];
  guides: StudyGuide[];
  dueCards: { questionId: string; interval: number; dueDate: string; easinessFactor: number; repetitions: number }[];
  notes: { folders: NoteFolder[]; notes: NoteDocument[] };
  classrooms: ClassRoom[];
  shareLinks: Record<string, string>;
}

export default function StudyHub({ user, sets, guides, dueCards, notes, classrooms, shareLinks }: StudyHubProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="min-h-screen pattern-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Study Hub</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Centralize your mastery workflow</h1>
              <p className="text-sm text-slate-300">Generate flashcards, launch quizzes, craft summaries, and track adaptive repetition.</p>
            </div>
            <AIFlashcardGenerator user={user} />
          </div>

          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  activeTab === tab.id ? "bg-cyan-500/30 text-cyan-100" : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
            <AnimatePresence mode="wait">
              {activeTab === "flashcards" && (
                <motion.div key="flashcards" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">
                  <StudyDeck user={user} sets={sets} />
                </motion.div>
              )}
              {activeTab === "quizzes" && (
                <motion.div key="quizzes" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <PracticeQuizWorkbench sets={sets} user={user} />
                </motion.div>
              )}
              {activeTab === "tests" && (
                <motion.div key="tests" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <PracticeTestPanel user={user} />
                </motion.div>
              )}
              {activeTab === "guides" && (
                <motion.div key="guides" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <StudyGuidePanel guides={guides} />
                </motion.div>
              )}
              {activeTab === "timelines" && (
                <motion.div key="timeline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <TimelinePanel sets={sets} />
                </motion.div>
              )}
              {activeTab === "notes" && (
                <motion.div key="notes" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <NotesPanel notes={notes.notes} folders={notes.folders} />
                </motion.div>
              )}
              {activeTab === "spaced" && (
                <motion.div key="spaced" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <SpacedReviewPanel cards={dueCards} sets={sets} />
                </motion.div>
              )}
              {activeTab === "classrooms" && (
                <motion.div key="classrooms" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <ClassroomPanel classrooms={classrooms} sets={sets} />
                </motion.div>
              )}
              {activeTab === "sharing" && (
                <motion.div key="sharing" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <SharingPanel sets={sets} shareLinks={shareLinks} />
                </motion.div>
              )}
              {activeTab === "integrity" && (
                <motion.div key="integrity" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <IntegrityPanel />
                </motion.div>
              )}
              {activeTab === "planner" && (
                <motion.div key="planner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <StudyPlannerPanel user={user} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
