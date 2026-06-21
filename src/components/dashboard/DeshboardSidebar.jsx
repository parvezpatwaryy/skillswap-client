import { LayoutSideContentLeft, Plus, Envelope, Gear, House, ListCheck, Person, CreditCard } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DeshboardSidebar({ role = "client" }) {
  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { icon: House, label: "Admin Stats", href: "/dashboard/admin" },
          { icon: Person, label: "Manage Users", href: "/dashboard/admin/users" },
          { icon: CreditCard, label: "Transactions", href: "/dashboard/admin/payments" },
        ];
      case "freelancer":
        return [
          { icon: House, label: "Dashboard", href: "/dashboard/freelancer" },
          { icon: ListCheck, label: "Browse Tasks", href: "/dashboard/freelancer/browse-tasks" },
          { icon: ListCheck, label: "My Proposals", href: "/dashboard/freelancer/my-proposals" },
          { icon: Gear, label: "Profile", href: "/dashboard/freelancer/profile" },
        ];
      default:
        return [
          { icon: House, label: "Overview", href: "/dashboard/client" },
          { icon: ListCheck, label: "My Tasks", href: "/dashboard/client/my-tasks" },
          { icon: Plus, label: "Post Task", href: "/dashboard/client/post-task" },
          { icon: Envelope, label: "Proposals", href: "/dashboard/client/proposals" },
        ];
    }
  };

  const navItems = getNavItems();

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}