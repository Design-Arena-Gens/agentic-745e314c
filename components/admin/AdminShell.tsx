"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ShieldCheck, Users, ToggleLeft, ToggleRight, Activity, Sparkles } from "lucide-react";
import { UserProfile } from "@/lib/types";

interface AdminShellProps {
  user: UserProfile;
}

async function unlockAdmin(password: string) {
  const res = await fetch("/api/admin/unlock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });
  if (!res.ok) throw new Error("Invalid password");
  return res.json();
}

async function fetchUsers() {
  const res = await fetch("/api/admin/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json() as Promise<{ users: UserProfile[] }>;
}

async function updateTier(payload: { userId: string; tier: "free" | "plus" | "pro" }) {
  const res = await fetch("/api/admin/tier", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update tier");
  return res.json();
}

export default function AdminShell({ user }: AdminShellProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");

  const unlockMutation = useMutation({
    mutationFn: () => unlockAdmin(password),
    onSuccess: () => setUnlocked(true)
  });

  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
    enabled: unlocked
  });

  const tierMutation = useMutation({
    mutationFn: updateTier,
    onSuccess: () => usersQuery.refetch()
  });

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-rose-400" />
            <h1 className="mt-4 text-2xl font-semibold">Restricted</h1>
            <p className="mt-2 text-sm text-slate-300">
              This account is not flagged as admin. Contact support for elevated access.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-cyan-300" />
            <h1 className="mt-4 text-2xl font-semibold">Admin Override Required</h1>
            <p className="mt-2 text-sm text-slate-300">Enter override password to access platform controls.</p>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Admin override"
              className="mt-6 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-center text-sm"
            />
            {unlockMutation.isError && <p className="mt-3 text-sm text-rose-400">Invalid password</p>}
            <button
              type="button"
              onClick={() => unlockMutation.mutate()}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-semibold text-white"
            >
              Unlock Console
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Admin Console</p>
          <h1 className="text-3xl font-semibold text-white">Control QuantumLearn platform levers</h1>
          <p className="text-sm text-slate-300">Manage tiers, moderate question pools, and analyze global performance.</p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">User Directory</h2>
              <Users className="h-6 w-6 text-cyan-300" />
            </div>
            <div className="mt-4 space-y-4 text-sm">
              {usersQuery.data?.users.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      <p className="text-xs text-slate-300">{entry.email}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      {(["free", "plus", "pro"] as const).map((tier) => (
                        <button
                          key={tier}
                          onClick={() => tierMutation.mutate({ userId: entry.id, tier })}
                          className={`rounded-full px-3 py-1 ${
                            entry.tier === tier ? "bg-cyan-500/30" : "bg-white/10"
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Feature Toggles</h2>
              <ToggleLeft className="h-6 w-6 text-amber-300" />
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-200">
              {[
                "enable-arcade",
                "ai-priority",
                "offline-sync",
                "anti-cheat"
              ].map((flag) => (
                <div key={flag} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>{flag.replace(/-/g, " ")}</span>
                  <ToggleRight className="h-5 w-5 text-emerald-300" />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Global Analytics</h2>
              <Activity className="h-6 w-6 text-emerald-300" />
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>• Active users last 24h: 1,248</li>
              <li>• Avg accuracy: 82%</li>
              <li>• Match integrity: 98%</li>
              <li>• Top game engagement: Photon Blaster</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Question Pool Controls</h2>
              <Sparkles className="h-6 w-6 text-purple-300" />
            </div>
            <p className="mt-4 text-sm text-slate-300">
              Import/export shared flashcard libraries, prune outdated content, and run AI audits for bias detection.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
