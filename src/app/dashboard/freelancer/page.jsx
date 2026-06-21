"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { FileText, Clock, Check, FileDollar } from "@gravity-ui/icons";

export default function FreelancerDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalProposals: 0,
    pendingProposals: 0,
    acceptedProposals: 0,
    totalEarnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(`http://localhost:5000/freelancer-stats/${session.user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Stats fetch failed:", err);
        setLoading(false);
      });
  }, [session]);

  const cards = [
    {
      label: "Total Proposals",
      value: stats.totalProposals,
      icon: FileText,
    },
    {
      label: "Pending Proposals",
      value: stats.pendingProposals,
      icon: Clock,
    },
    {
      label: "Accepted Proposals",
      value: stats.acceptedProposals,
      icon: Check,
    },
    {
      label: "Total Earnings (USD)",
      value: `$${stats.totalEarnings}`,
      icon: FileDollar,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">
        Welcome, {session?.user?.name || "Freelancer"}
      </h1>
      <p className="text-muted mb-6">Here's an overview of your activity.</p>

      {loading ? (
        <p className="text-muted">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-default p-5 bg-card flex flex-col gap-2"
            >
              <card.icon className="size-6 text-muted" />
              <span className="text-sm text-muted">{card.label}</span>
              <span className="text-2xl font-semibold">{card.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}