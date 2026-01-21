import { redirect } from "next/navigation";
import {
  getCurrentUser,
  listFlashcardSets,
  getStudyGuides,
  getDueStudyCards,
  listNotes,
  getClassrooms,
  createShareLink
} from "@/lib/data/store";
import StudyHub from "@/components/study/StudyHub";

export default async function StudyPage() {
  const user = getCurrentUser();
  if (!user) redirect("/auth/login");

  const sets = listFlashcardSets(user.id);
  const guides = getStudyGuides();
  const dueCards = getDueStudyCards(user.id);
  const notes = listNotes(user.id);
  const classrooms = getClassrooms(user.id);
  const shareLinks = Object.fromEntries(sets.map((set) => [set.id, createShareLink(set.id)]));

  return (
    <StudyHub
      user={user}
      sets={sets}
      guides={guides}
      dueCards={dueCards}
      notes={notes}
      classrooms={classrooms}
      shareLinks={shareLinks}
    />
  );
}
