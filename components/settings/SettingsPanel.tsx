"use client";

import { useState } from "react";
import { UserProfile } from "@/lib/types";
import { useSettings } from "@/lib/hooks/SettingsContext";
import { Switch } from "@headlessui/react";
import { Moon, Sun, Volume2, VolumeX, Activity, Accessibility, Shield } from "lucide-react";

interface SettingsPanelProps {
  user: UserProfile;
}

export default function SettingsPanel({ user }: SettingsPanelProps) {
  const { preferences, setPreferences } = useSettings();
  const [soundEnabled, setSoundEnabled] = useState(preferences.sounds);

  const toggleTheme = (theme: "light" | "dark" | "system") => setPreferences({ theme });

  return (
    <div className="min-h-screen pattern-bg">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <header className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Settings</p>
          <h1 className="text-3xl font-semibold text-white">Customize your QuantumLearn experience</h1>
          <p className="text-sm text-slate-300">Manage themes, audio, difficulty, accessibility, and account preferences.</p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-slate-300">Switch between light, dark, or system modes.</p>
            <div className="mt-4 grid gap-3">
              {[
                { label: "Light", icon: Sun, value: "light" },
                { label: "Dark", icon: Moon, value: "dark" },
                { label: "System", icon: Shield, value: "system" }
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleTheme(option.value as "light" | "dark" | "system")}
                    className={`flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm ${
                      preferences.theme === option.value ? "bg-cyan-500/20" : "bg-white/5"
                    }`}
                  >
                    <span>{option.label}</span>
                    <Icon className="h-5 w-5" />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <h2 className="text-lg font-semibold">Audio & Animations</h2>
            <p className="text-sm text-slate-300">Control sonic feedback and motion.</p>
            <div className="mt-4 space-y-3">
              <Switch.Group>
                <div className="flex items-center justify-between">
                  <Switch.Label className="text-sm">Enable sounds</Switch.Label>
                  <Switch
                    checked={soundEnabled}
                    onChange={(value) => {
                      setSoundEnabled(value);
                      setPreferences({ sounds: value });
                    }}
                    className={`${soundEnabled ? "bg-cyan-400" : "bg-white/10"} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className={`${soundEnabled ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white`} />
                  </Switch>
                </div>
              </Switch.Group>
              <Switch.Group>
                <div className="flex items-center justify-between">
                  <Switch.Label className="text-sm">Animations</Switch.Label>
                  <Switch
                    checked={preferences.animations}
                    onChange={(value) => setPreferences({ animations: value })}
                    className={`${preferences.animations ? "bg-cyan-400" : "bg-white/10"} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className={`${preferences.animations ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white`} />
                  </Switch>
                </div>
              </Switch.Group>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <h2 className="text-lg font-semibold">Difficulty</h2>
            <p className="text-sm text-slate-300">Current scaling: {preferences.difficultyScaling}</p>
            <div className="mt-4 flex gap-3">
              {["adaptive", "manual"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPreferences({ difficultyScaling: mode as typeof preferences.difficultyScaling })}
                  className={`rounded-full px-4 py-2 text-sm ${
                    preferences.difficultyScaling === mode ? "bg-emerald-400/30" : "bg-white/10"
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <h2 className="text-lg font-semibold">Accessibility</h2>
            <p className="text-sm text-slate-300">Tune fonts, contrast, motion, captions.</p>
            <div className="mt-4 space-y-3 text-sm">
              {Object.entries(preferences.accessibility).map(([key, value]) => (
                <Switch.Group key={key}>
                  <div className="flex items-center justify-between">
                    <Switch.Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Switch.Label>
                    <Switch
                      checked={value as boolean}
                      onChange={(checked) =>
                        setPreferences({
                          accessibility: {
                            ...preferences.accessibility,
                            [key]: checked
                          }
                        })
                      }
                      className={`${value ? "bg-emerald-400" : "bg-white/10"} relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className={`${value ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white`} />
                    </Switch>
                  </div>
                </Switch.Group>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <h2 className="text-lg font-semibold">Account Preferences</h2>
            <p className="text-sm text-slate-300">Notification and reminder cadence.</p>
            <div className="mt-4 space-y-3 text-sm">
              {Object.entries(preferences.notificationSettings).map(([key, value]) => (
                <Switch.Group key={key}>
                  <div className="flex items-center justify-between">
                    <Switch.Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Switch.Label>
                    <Switch
                      checked={value as boolean}
                      onChange={(checked) =>
                        setPreferences({
                          notificationSettings: {
                            ...preferences.notificationSettings,
                            [key]: checked
                          }
                        })
                      }
                      className={`${value ? "bg-sky-400" : "bg-white/10"} relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className={`${value ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white`} />
                    </Switch>
                  </div>
                </Switch.Group>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <h2 className="text-lg font-semibold">Offline Mode</h2>
            <p className="text-sm text-slate-300">QuantumSync queues the next 50 flashcards, guides, and questions for offline access.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Cache flashcards & guides for flights</li>
              <li>• Local quizzes, sync on reconnect</li>
              <li>• Conflict resolution merges answers</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
