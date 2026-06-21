import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DeshboardSidebar } from "@/components/dashboard/DeshboardSidebar";

export default async function FreelancerLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const role = session.user.role;

  if (role !== "freelancer") {
    if (role === "client") redirect("/dashboard/client");
    if (role === "admin") redirect("/dashboard/admin");
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <DeshboardSidebar role="freelancer" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}