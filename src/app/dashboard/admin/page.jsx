"use client";
import { useEffect, useState } from "react";

export default function AdminStatsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/admin-stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  const cards = [
    { label: "Total Users", value: stats.totalUsers },
    { label: "Total Tasks", value: stats.totalTasks },
    { label: "Total Revenue (USD)", value: `$${stats.totalRevenue}` },
    { label: "Active Tasks", value: stats.activeTasks },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-default p-5">
          <p className="text-sm text-muted">{card.label}</p>
          <p className="text-2xl font-semibold mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
}