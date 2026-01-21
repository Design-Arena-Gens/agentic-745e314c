"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/AuthContext";
import { UserPlus, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const ok = await register(form);
      if (!ok) {
        setError("Unable to create account");
        return;
      }
      router.push("/");
    } catch (e) {
      setError("Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.4),_transparent)]" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em]">
              <Sparkles className="h-4 w-4 text-violet-300" />
              QuantumLearn
            </span>
            <h1 className="mt-6 text-4xl font-semibold text-white">Create your learning profile</h1>
            <p className="mt-4 text-slate-300">
              Build flashcards, launch AI study guides, master games, and unlock pro-level analytics.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>• AI flashcard generation from text, PDFs, or topics</li>
              <li>• Adaptive quizzes and exams with analytics</li>
              <li>• 25 arcade experiences feeding into mastery</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="card space-y-6 rounded-3xl border border-white/10 bg-white/10 p-8">
            <div>
              <label className="text-xs uppercase tracking-[0.32em] text-slate-400">Full name</label>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm outline-none focus:border-violet-400"
                placeholder="Avery Quantum"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.32em] text-slate-400">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm outline-none focus:border-violet-400"
                placeholder="you@school.edu"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.32em] text-slate-400">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm outline-none focus:border-violet-400"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-400 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90"
            >
              <UserPlus className="h-4 w-4" />
              Activate AI Companion
            </button>
            <p className="text-sm text-slate-400">
              Already have an account? <Link href="/auth/login" className="text-violet-200 hover:text-violet-100">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
