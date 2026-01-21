import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuantumLearn | AI Study Platform",
  description: "All-in-one AI-powered study universe with flashcards, tests, games, and analytics.",
  metadataBase: new URL("https://agentic-745e314c.vercel.app")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[var(--bg-color)] text-[var(--text-color)]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
