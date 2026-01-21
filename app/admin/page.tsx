import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/store";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminPage() {
  const user = getCurrentUser();
  if (!user) redirect("/auth/login");
  return <AdminShell user={user} />;
}
