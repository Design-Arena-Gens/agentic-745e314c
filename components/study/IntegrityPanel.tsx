"use client";

import { ShieldCheck, Eye, Cpu, WifiOff } from "lucide-react";

export default function IntegrityPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Anti-Cheat Intelligence</h2>
            <p className="text-sm text-slate-300">Real-time proctoring signals and anomaly detection.</p>
          </div>
          <ShieldCheck className="h-6 w-6 text-emerald-300" />
        </div>
        <div className="mt-4 space-y-4 text-sm text-slate-200">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Behavioral signals</p>
            <ul className="mt-3 space-y-2">
              <li>• Eye tracking heuristics flag focus drift</li>
              <li>• Keyboard anomaly detector catches macro spams</li>
              <li>• Device fingerprinting prevents duplicate sessions</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">AI Proctor</p>
            <p className="mt-3 text-sm text-slate-200">Computer vision powered by on-device inference ensures privacy while flagging suspicious behaviors.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Offline Sync Guard</p>
            <p className="mt-3 text-sm text-slate-200">When offline mode caches assessments, submission hashes validate authenticity on resync preventing tampering.</p>
          </div>
        </div>
      </section>
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Security Layers</p>
        <ul className="mt-4 space-y-2">
          <li className="flex gap-2"><Eye className="h-4 w-4 text-cyan-300" /> Spectator metrics for live teachers</li>
          <li className="flex gap-2"><Cpu className="h-4 w-4 text-purple-300" /> ML-driven anomaly detection</li>
          <li className="flex gap-2"><WifiOff className="h-4 w-4 text-rose-300" /> Airplane mode safeguards with encrypted logs</li>
        </ul>
      </aside>
    </div>
  );
}
