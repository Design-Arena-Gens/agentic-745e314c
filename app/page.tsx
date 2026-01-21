import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getCurrentUser, getDailyChallenge, getExamCountdowns, getProgress } from "@/lib/data/store";

export default async function Page() {
  const user = getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const progress = getProgress(user.id);
  const challenge = getDailyChallenge();
  const exams = getExamCountdowns();

  return (
    <DashboardShell user={user} progress={progress} challenge={challenge} exams={exams} />
  );
}
