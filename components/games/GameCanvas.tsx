"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { UseMutationResult } from "@tanstack/react-query";
import { GameDefinition, Question, UserProfile } from "@/lib/types";
import { GameState, calculateRewards, nextQuestion, resolveAnswer } from "@/lib/games/gameEngine";
import GameModeRenderer from "@/components/games/modes/GameModes";
import { Trophy, Award, Flame, RefreshCcw } from "lucide-react";

interface GameCanvasProps {
  definition: GameDefinition;
  mutation: UseMutationResult<{ state: GameState; definition: GameDefinition }, Error, string, unknown>;
  user: UserProfile;
}

export default function GameCanvas({ definition, mutation, user }: GameCanvasProps) {
  const [state, setState] = useState<GameState | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [rewards, setRewards] = useState<{ xp: number; currency: number; cosmetics: string[] } | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    mutation.mutate(definition.id, {
      onSuccess: ({ state: freshState }) => {
        setState(freshState);
        setQuestion(nextQuestion(freshState));
        setRewards(null);
      }
    });
  }, [definition.id, mutation]);

  useEffect(() => {
    if (!state?.completed) return;
    setRewards(calculateRewards(state, definition));
  }, [state, definition]);

  const handleAnswer = (correct: boolean) => {
    if (!state) return;
    const newState = resolveAnswer(state, correct);
    setState(newState);
    setQuestion(nextQuestion(newState));
  };

  const resetGame = () => {
    mutation.mutate(definition.id, {
      onSuccess: ({ state: freshState }) => {
        setState(freshState);
        setQuestion(nextQuestion(freshState));
        setRewards(null);
      }
    });
  };

  const status = useMemo(() => {
    if (!state) return null;
    return {
      score: state.score,
      combo: state.combo,
      health: state.health,
      wave: state.currentWave + 1
    };
  }, [state]);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-300">{definition.mode}</p>
          <h2 className="text-2xl font-semibold text-white">{definition.name}</h2>
          <p className="text-sm text-slate-200/80">{definition.description}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-200">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Trophy className="h-4 w-4 text-amber-300" /> Score {status?.score ?? 0}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Flame className="h-4 w-4 text-emerald-300" /> Combo {status?.combo ?? 0}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            Wave {status?.wave ?? 1}/5
          </span>
        </div>
      </div>

      {state && question ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <GameModeRenderer
            definition={definition}
            state={state}
            question={question}
            onAnswer={handleAnswer}
          />
          <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rewards</p>
            <p className="mt-2 text-slate-100">
              XP {definition.rewards.xp} · QC {definition.rewards.currency} · Cosmetics {definition.rewards.cosmetics.length}
            </p>
            <div className="mt-4 grid gap-3 text-xs text-slate-300">
              {definition.mechanics.map((mechanic) => (
                <span key={mechanic} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  {mechanic}
                </span>
              ))}
            </div>
            {state.completed && rewards && (
              <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-100">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <Award className="h-5 w-5" /> Completed Run
                </div>
                <p className="mt-2 text-sm">XP {rewards.xp} · QC {rewards.currency}</p>
                {rewards.cosmetics.length > 0 && (
                  <p className="text-xs">Unlocked cosmetics: {rewards.cosmetics.join(", ")}</p>
                )}
                <button
                  type="button"
                  onClick={resetGame}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white"
                >
                  <RefreshCcw className="h-4 w-4" /> Replay
                </button>
              </div>
            )}
          </aside>
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-300">Loading game session...</p>
      )}
    </section>
  );
}
