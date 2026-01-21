import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/store";
import SettingsPanel from "@/components/settings/SettingsPanel";

export default async function SettingsPage() {
  const user = getCurrentUser();
  if (!user) redirect("/auth/login");
  return <SettingsPanel user={user} />;
}
