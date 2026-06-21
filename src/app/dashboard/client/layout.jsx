import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DeshboardSidebar } from "@/components/dashboard/DeshboardSidebar";

export default async function ClientLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // লগইন করা না থাকলে -> লগইন পেজে পাঠাও
  if (!session) {
    redirect("/auth/signin");
  }

  const role = session.user.role;

  // role client না হলে -> তার নিজের সঠিক dashboard এ পাঠাও
  if (role !== "client") {
    if (role === "freelancer") redirect("/dashboard/freelancer");
    if (role === "admin") redirect("/dashboard/admin");
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <DeshboardSidebar role="client" />
      <main className="flex-1 p-6 md:p-8 bg-background">
        {children}
      </main>
    </div>
  );
}