"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Waves,
  Coffee,
  Flag,
  Swords,
  Sprout,
  Axe,
  Keyboard,
  Puzzle,
  Skull,
  Radio,
  Clover,
  Building,
  Rocket,
  Mountain,
  Activity,
  LockOpen,
  Grid,
  Globe,
  Sword as SwordIcon,
  Crown,
  Route,
  PenTool,
  Music4,
  TimerReset
} from "lucide-react";
import { GameDefinition, Question } from "@/lib/types";
import { GameState } from "@/lib/games/gameEngine";

interface GameModeRendererProps {
  state: GameState;
  definition: GameDefinition;
  question: Question;
  onAnswer: (correct: boolean) => void;
}

function OptionGrid({ options, correctIndex, onSelect }: { options?: string[]; correctIndex: number; onSelect: (correct: boolean) => void }) {
  if (!options) return null;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(index === correctIndex)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/40"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

const iconMap = {
  "tower-defense": Shield,
  "survivor-horde": Waves,
  "cafe-manager": Coffee,
  "racing-quiz": Flag,
  "battle-royale": Swords,
  "farming-idle": Sprout,
  "dungeon-crawler": Axe,
  "typing-speed": Keyboard,
  "memory-match": Puzzle,
  "boss-fight": Skull,
  "capture-flag": Radio,
  "card-battler": Clover,
  "city-builder": Building,
  "space-shooter": Rocket,
  "platformer-quiz": Mountain,
  "endless-runner": Activity,
  "puzzle-escape": LockOpen,
  "strategy-board": Grid,
  "risk-map": Globe,
  "turn-based-rpg": SwordIcon,
  "quiz-chess": Crown,
  "maze-runner": Route,
  "word-combat": PenTool,
  "rhythm-quiz": Music4,
  "time-attack": TimerReset
};

const mechanicsCopy: Record<string, string> = {
  "tower-defense": "Deploy knowledge towers. Answer correctly to charge defenses.",
  "survivor-horde": "Hold the line by chaining correct answers.",
  "cafe-manager": "Serve concepts in the right order to keep the crowd happy.",
  "racing-quiz": "Accelerate with precision answers against the clock.",
  "battle-royale": "Every correct answer eliminates an opponent.",
  "farming-idle": "Grow your knowledge grove by planting correct choices.",
  "dungeon-crawler": "Navigate floors, unlocking doors with right answers.",
  "typing-speed": "Type or choose quickly to maintain boost multiplier.",
  "memory-match": "Flip knowledge tiles to match pairs.",
  "boss-fight": "Break shields and defeat the Omega Overlord.",
  "capture-flag": "Secure nodes by locking in answers.",
  "card-battler": "Play concept cards strategically.",
  "city-builder": "Construct mastery districts with correct responses.",
  "space-shooter": "Blast incorrect answers and dodge traps.",
  "platformer-quiz": "Leap across platforms gated by knowledge orbs.",
  "endless-runner": "Dash endlessly dodging misconceptions.",
  "puzzle-escape": "Solve sequential puzzles to escape.",
  "strategy-board": "Control the board with strategic answers.",
  "risk-map": "Conquer territories by mastering questions.",
  "turn-based-rpg": "Trigger party skills with precise responses.",
  "quiz-chess": "Unlock chess moves using correct answers.",
  "maze-runner": "Choose branches leading to the core exit.",
  "word-combat": "Forge vocabulary attacks in realtime.",
  "rhythm-quiz": "Hit rhythm beats while answering.",
  "time-attack": "Beat the timer in escalating waves."
};

export default function GameModeRenderer({ state, definition, question, onAnswer }: GameModeRendererProps) {
  const Icon = iconMap[definition.id];
  const [typed, setTyped] = useState("");

  const choices = question.options ?? [question.answer, `${question.answer} alt`, `${question.answer} distractor`, `${question.answer} trap`];
  const computedIndex = question.options ? question.options.findIndex((option) => option === question.answer) : 0;
  const correctIndex = computedIndex >= 0 ? computedIndex : 0;

  const renderInteractive = () => {
    switch (definition.id) {
      case "tower-defense":
        return (
          <div className="space-y-4">
            <p className="text-sm text-cyan-100">{mechanicsCopy[definition.id]}</p>
            <div className="grid gap-3">
              <p className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">Wave threat level {state.currentWave + 1}. Route energy to towers by selecting the correct countermeasure.</p>
              <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
            </div>
          </div>
        );
      case "survivor-horde":
        return (
          <div className="space-y-4">
            <p className="text-sm text-emerald-100">The horde surges. Chain answers to maintain shields.</p>
            <div className="grid gap-2">
              {choices.map((option, index) => (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );
      case "cafe-manager":
        return (
          <div className="space-y-4">
            <p className="text-sm text-amber-100">Serve the right concept recipe for queued customers.</p>
            <div className="grid gap-2 text-xs text-slate-200">
              <p>Current order: {question.prompt}</p>
              <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
            </div>
          </div>
        );
      case "racing-quiz":
        return (
          <div className="space-y-4">
            <p className="text-sm text-sky-100">Maintain top speed by hitting correct checkpoints.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {choices.map((option, index) => (
                <button
                  key={option}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-xl border border-white/10 bg-gradient-to-br from-sky-500/20 to-blue-500/10 px-4 py-4 text-left text-sm"
                >
                  <span className="block text-xs uppercase tracking-[0.32em] text-sky-200">Checkpoint {index + 1}</span>
                  <span className="mt-2 block text-slate-100">{option}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case "battle-royale":
        return (
          <div className="space-y-4">
            <p className="text-sm text-rose-100">Outlast opponents by locking in correct answers.</p>
            <div className="flex flex-col gap-3">
              {choices.map((option, index) => (
                <button
                  key={option}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-left text-sm"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case "farming-idle":
        return (
          <div className="space-y-4">
            <p className="text-sm text-emerald-100">Plant the correct knowledge seed to grow the grove.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {choices.map((option, index) => (
                <button
                  key={option}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-left text-sm"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case "dungeon-crawler":
        return (
          <div className="space-y-4">
            <p className="text-sm text-purple-100">Unlock the next floor door with the correct rune.</p>
            <div className="grid gap-2">
              {choices.map((option, index) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-xl border border-purple-400/30 bg-purple-500/10 px-4 py-3 text-left text-sm"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );
      case "typing-speed":
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-200">Type the correct answer to maintain boost.</p>
            <input
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              placeholder="Type answer and press enter"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onAnswer(typed.trim().toLowerCase() === question.answer.trim().toLowerCase());
                  setTyped("");
                }
              }}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            />
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "memory-match":
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-200">Match the prompt with its corresponding answer.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {choices.map((option, index) => (
                <button
                  key={option}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm"
                  onClick={() => onAnswer(index === correctIndex)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case "boss-fight":
        return (
          <div className="space-y-4">
            <p className="text-sm text-rose-100">Phase {state.currentWave + 1}: break the boss shield.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "capture-flag":
        return (
          <div className="space-y-4">
            <p className="text-sm text-cyan-100">Capture nodes by locking in correct frequencies.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {choices.map((option, index) => (
                <button
                  key={option}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-left text-sm"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case "card-battler":
        return (
          <div className="space-y-4">
            <p className="text-sm text-violet-100">Play the concept card that counters the opponent.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {choices.map((option, index) => (
                <motion.button
                  key={option}
                  whileHover={{ rotate: -1 }}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-3xl border border-violet-400/30 bg-violet-500/10 px-4 py-3 text-left text-sm"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );
      case "city-builder":
        return (
          <div className="space-y-4">
            <p className="text-sm text-amber-100">Construct districts by choosing the right blueprint.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "space-shooter":
        return (
          <div className="space-y-4">
            <p className="text-sm text-sky-100">Blast incorrect asteroids, lock in the true signal.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {choices.map((option, index) => (
                <button
                  key={option}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-3 text-left text-sm"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case "platformer-quiz":
        return (
          <div className="space-y-4">
            <p className="text-sm text-emerald-100">Unlock the next platform gate by selecting the correct orb.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "endless-runner":
        return (
          <div className="space-y-4">
            <p className="text-sm text-cyan-100">Keep sprinting by dodging wrong paths.</p>
            <div className="grid gap-2">
              {choices.map((option, index) => (
                <motion.button
                  key={option}
                  whileHover={{ x: 4 }}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-left text-sm"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );
      case "puzzle-escape":
        return (
          <div className="space-y-4">
            <p className="text-sm text-amber-100">Solve the escape puzzle sequence.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "strategy-board":
        return (
          <div className="space-y-4">
            <p className="text-sm text-indigo-100">Claim board nodes with strategic answers.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {choices.map((option, index) => (
                <button
                  key={option}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-3 text-left text-sm"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case "risk-map":
        return (
          <div className="space-y-4">
            <p className="text-sm text-green-100">Expand territories with correct campaigns.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "turn-based-rpg":
        return (
          <div className="space-y-4">
            <p className="text-sm text-emerald-100">Trigger party abilities by channeling the right knowledge rune.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "quiz-chess":
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-200">Unlock the next chess move by selecting the accurate theory.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "maze-runner":
        return (
          <div className="space-y-4">
            <p className="text-sm text-blue-100">Choose the maze branch leading to the core exit.</p>
            <div className="grid gap-3">
              {choices.map((option, index) => (
                <button
                  key={option}
                  onClick={() => onAnswer(index === correctIndex)}
                  className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-left text-sm"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case "word-combat":
        return (
          <div className="space-y-4">
            <p className="text-sm text-pink-100">Forge a word strike by selecting the most precise term.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "rhythm-quiz":
        return (
          <div className="space-y-4">
            <p className="text-sm text-purple-100">Tap in rhythm while choosing the right beat.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      case "time-attack":
        return (
          <div className="space-y-4">
            <p className="text-sm text-amber-100">Beat the countdown by locking answers rapidly.</p>
            <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />
          </div>
        );
      default:
        return <OptionGrid options={choices} correctIndex={correctIndex} onSelect={onAnswer} />;
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
      <div className="flex items-center gap-3">
        <Icon className="h-8 w-8 text-cyan-300" />
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Scenario</p>
          <h3 className="text-lg font-semibold text-white">{question.prompt}</h3>
        </div>
      </div>
      <div className="mt-4 text-xs uppercase tracking-[0.32em] text-slate-500">
        Difficulty {question.difficulty}
      </div>
      <div className="mt-6 space-y-4">{renderInteractive()}</div>
    </div>
  );
}
