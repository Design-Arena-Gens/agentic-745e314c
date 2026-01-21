export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-slate-100">
      <h1 className="text-3xl font-semibold">Offline Mode Active</h1>
      <p className="max-w-md text-center text-sm text-slate-300">
        We saved your pending flashcards, quizzes, and timeline updates. Continue studying and we will sync progress once your connection returns.
      </p>
    </div>
  );
}
