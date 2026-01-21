"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/AuthContext";
import { LucideLogIn, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const ok = await login({ email, password });
    if (!ok) {
      setError("Invalid credentials");
      return;
    }
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.5),_transparent)]" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em]">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              QuantumLearn
            </span>
            <h1 className="mt-6 text-4xl font-semibold text-white">Log in to your study universe</h1>
            <p className="mt-4 text-slate-300">
              Seamless AI-assisted flashcards, adaptive tests, and competitive games waiting for you.
            </p>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-300">Demo credentials</p>
              <p className="mt-2 text-sm text-slate-200">Email: demo@quantumlearn.ai</p>
              <p className="text-sm text-slate-200">Password: demo-pass</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="card space-y-6 rounded-3xl border border-white/10 bg-white/10 p-8">
            <div>
              <label className="text-xs uppercase tracking-[0.32em] text-slate-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                placeholder="you@school.edu"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.32em] text-slate-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90"
            >
              <LucideLogIn className="h-4 w-4" />
              Enter Dashboard
            </button>
            <p className="text-sm text-slate-400">
              New to QuantumLearn? <Link href="/auth/register" className="text-cyan-200 hover:text-cyan-100">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
