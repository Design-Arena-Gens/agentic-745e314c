"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { UserProfile } from "@/lib/types";
import { useAuth } from "@/lib/hooks/AuthContext";
import { Sun, Moon, Settings, LogOut, Trophy, LayoutDashboard, Joystick, BookOpen } from "lucide-react";

const routes = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/study", label: "Study Hub", icon: BookOpen },
  { href: "/games", label: "Arcade", icon: Joystick },
  { href: "/settings", label: "Settings", icon: Settings }
];

interface DashboardNavProps {
  user: UserProfile;
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();
  const auth = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-cyan-200">
          <Trophy className="h-6 w-6" />
          QuantumLearn
        </Link>
        <div className="flex items-center gap-2">
          {routes.map((route) => {
            const Icon = route.icon;
            const active = pathname === route.href;
            return (
              <Link key={route.href} href={route.href} className="relative">
                <motion.span
                  whileHover={{ scale: 1.06 }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                    active ? "bg-cyan-500/20 text-cyan-100" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {route.label}
                </motion.span>
                {active && (
                  <motion.span layoutId="nav-indicator" className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          {user.role === "admin" && (
            <Link
              href="/admin"
              className="rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-2 text-xs uppercase tracking-widest text-pink-200 transition hover:bg-pink-500/20"
            >
              Admin Console
            </Link>
          )}
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <span className="font-semibold text-white">{user.name}</span>
            <span className="ml-2 text-xs uppercase tracking-wide text-slate-400">Tier: {user.tier}</span>
          </div>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10"
          >
            {mounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
          </button>
          <button
            type="button"
            onClick={() => auth.logout()}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
