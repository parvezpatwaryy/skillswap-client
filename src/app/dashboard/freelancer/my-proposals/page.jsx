"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-400",
  accepted: "bg-green-500/10 text-green-400",
  rejected: "bg-red-500/10 text-red-400",
};

export default function MyProposalsPage() {
  const { data: session } = useSession();
  const [proposals, setProposals] = useState([]);
  const [taskTitles, setTaskTitles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `http://localhost:5000/proposals?email=${session.user.email}&role=freelancer`
    )
      .then((res) => res.json())
      .then(async (data) => {
        setProposals(data);
        const titles = {};
        await Promise.all(
          data.map(async (p) => {
            try {
              const res = await fetch(`http://localhost:5000/tasks/${p.task_id}`);
              const task = await res.json();
              titles[p.task_id] = task.title || "Untitled Task";
            } catch {
              titles[p.task_id] = "Unknown Task";
            }
          })
        );
        setTaskTitles(titles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Proposals fetch failed:", err);
        setLoading(false);
      });
  }, [session]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Proposals</h1>

      {loading ? (
        <p className="text-muted">Loading proposals...</p>
      ) : proposals.length === 0 ? (
        <p className="text-muted">You haven't submitted any proposals yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-default">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-default text-left text-muted">
                <th className="px-4 py-3 font-medium">Task Title</th>
                <th className="px-4 py-3 font-medium">Budget Bid</th>
                <th className="px-4 py-3 font-medium">Date Sent</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((p) => (
                <tr key={p._id} className="border-b border-default last:border-0">
                  <td className="px-4 py-3">
                    {taskTitles[p.task_id] || "Loading..."}
                  </td>
                  <td className="px-4 py-3">${p.proposed_budget}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(p.submitted_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        statusStyles[p.status] || "bg-default text-muted"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}