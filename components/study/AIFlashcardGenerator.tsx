"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Wand2, Loader2 } from "lucide-react";
import { UserProfile } from "@/lib/types";

interface AIFlashcardGeneratorProps {
  user: UserProfile;
}

async function generateFlashcards(payload: {
  userId: string;
  input: string;
  mode: "text" | "topic";
}) {
  const res = await fetch("/api/data/flashcards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to generate flashcards");
  return res.json();
}

export default function AIFlashcardGenerator({ user }: AIFlashcardGeneratorProps) {
  const client = useQueryClient();
  const [input, setInput] = useState("");

  const mutation = useMutation({
    mutationFn: (mode: "text" | "topic") => generateFlashcards({ userId: user.id, input, mode }),
    onSuccess: () => {
      setInput("");
      client.invalidateQueries({ queryKey: ["flashcards"] });
    }
  });

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
      <label className="text-xs uppercase tracking-[0.32em] text-slate-400">AI Flashcard Maker</label>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Paste study notes, highlight PDF text, or describe a topic (e.g. 'Photosynthesis light-dependent reactions')."
        className="h-24 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
      />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => mutation.mutate("text")}
          disabled={!input.trim() || mutation.isPending}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white disabled:opacity-60"
        >
          {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Generate
        </button>
        <button
          type="button"
          onClick={() => mutation.mutate("topic")}
          disabled={!input.trim() || mutation.isPending}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100 disabled:opacity-60"
        >
          <Wand2 className="h-4 w-4" /> Quick Topic
        </button>
      </div>
      {mutation.error && <p className="text-xs text-rose-400">Failed to generate flashcards. Try again.</p>}
    </div>
  );
}
