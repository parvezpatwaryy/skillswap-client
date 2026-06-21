"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function ManageProposalsPage() {
  const { data: session } = useSession();
  const [proposals, setProposals] = useState([]);
  const [taskTitles, setTaskTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchProposals = () => {
    if (!session?.user?.email) return;

    fetch(
      `http://localhost:5000/proposals?email=${session.user.email}&role=client`
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
              titles[p.task_id] = task;
            } catch {
              titles[p.task_id] = { title: "Unknown Task" };
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
  };

  useEffect(() => {
    fetchProposals();
  }, [session]);

  const handleAccept = async (proposal) => {
    const task = taskTitles[proposal.task_id];
    const alreadyAccepted = proposals.some(
      (p) => p.task_id === proposal.task_id && p.status === "accepted"
    );
    if (alreadyAccepted) {
      alert("This task already has an accepted proposal.");
      return;
    }

    if (!confirm(`Accept this proposal from ${proposal.freelancer_email}? You will be redirected to payment.`)) return;

    setProcessingId(proposal._id);

    try {
      const res = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_id: proposal.task_id,
          proposal_id: proposal._id,
          amount: proposal.proposed_budget,
          task_title: task?.title || "Task Payment",
          freelancer_email: proposal.freelancer_email,
          client_email: session.user.email,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment session তৈরি করা যায়নি। আবার চেষ্টা করুন।");
        setProcessingId(null);
      }
    } catch (err) {
      console.error("Checkout session creation failed:", err);
      alert("Something went wrong. Please try again.");
      setProcessingId(null);
    }
  };

  const handleReject = async (proposal) => {
    if (!confirm(`Reject this proposal from ${proposal.freelancer_email}?`)) return;

    setProcessingId(proposal._id);

    try {
      await fetch(`http://localhost:5000/proposals/${proposal._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });

      fetchProposals();
    } catch (err) {
      console.error("Reject failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manage Proposals</h1>

      {loading ? (
        <p className="text-muted">Loading proposals...</p>
      ) : proposals.length === 0 ? (
        <p className="text-muted">No proposals received yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {proposals.map((p) => {
            const task = taskTitles[p.task_id] || {};
            const taskHasAccepted = proposals.some(
              (x) => x.task_id === p.task_id && x.status === "accepted"
            );

            return (
              <div
                key={p._id}
                className="rounded-xl border border-default p-5 bg-card flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{task.title || "Loading..."}</h3>
                    <p className="text-sm text-muted">
                      Freelancer: {p.freelancer_email}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      p.status === "accepted"
                        ? "bg-green-500/10 text-green-400"
                        : p.status === "rejected"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted block">Proposed Budget</span>
                    <span className="font-semibold">${p.proposed_budget}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Completion Time</span>
                    <span className="font-semibold">{p.estimated_days} days</span>
                  </div>
                </div>

                <div>
                  <span className="text-muted text-sm block mb-1">Cover Note</span>
                  <p className="text-sm">{p.cover_note}</p>
                </div>

                {p.status === "pending" && (
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleAccept(p)}
                      disabled={processingId === p._id || taskHasAccepted}
                      className="px-5 py-2 rounded-lg bg-green-600 text-white text-sm font-medium disabled:opacity-50"
                    >
                      {processingId === p._id ? "Redirecting to payment..." : "Accept"}
                    </button>
                    <button
                      onClick={() => handleReject(p)}
                      disabled={processingId === p._id}
                      className="px-5 py-2 rounded-lg border border-red-500/30 text-red-400 text-sm font-medium disabled:opacity-50"
                    >
                      {processingId === p._id ? "Processing..." : "Reject"}
                    </button>
                  </div>
                )}

                {taskHasAccepted && p.status === "pending" && (
                  <p className="text-xs text-muted">
                    This task already has an accepted proposal.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}