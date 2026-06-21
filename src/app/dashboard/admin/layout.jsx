import { DeshboardSidebar } from "@/components/dashboard/DeshboardSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <DeshboardSidebar role="admin" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}