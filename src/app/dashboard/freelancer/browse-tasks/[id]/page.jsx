"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [proposedBudget, setProposedBudget] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [coverNote, setCoverNote] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Task fetch failed:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!session?.user?.email || !id) return;

    fetch(
      `http://localhost:5000/proposals/check?task_id=${id}&freelancer_email=${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setAlreadyApplied(data.exists))
      .catch((err) => console.error("Check failed:", err));
  }, [session, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!session?.user?.email) {
      setError("You must be logged in to submit a proposal.");
      return;
    }

    if (!proposedBudget || !estimatedDays || !coverNote) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    const newProposal = {
      task_id: id,
      freelancer_email: session.user.email,
      proposed_budget: parseFloat(proposedBudget),
      estimated_days: parseInt(estimatedDays),
      cover_note: coverNote,
      status: "pending",
      submitted_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProposal),
      });

      const data = await res.json();

      if (data.insertedId) {
        setSuccess(true);
        setAlreadyApplied(true);
      } else {
        setError("Failed to submit proposal. Please try again.");
      }
    } catch (err) {
      console.error("Submit failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-muted">Loading task details...</p>;
  }

  if (!task) {
    return <p className="text-muted">Task not found.</p>;
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => router.back()}
        className="text-sm text-muted mb-4 hover:underline"
      >
        ← Back to Browse Tasks
      </button>

      <div className="rounded-xl border border-default p-6 bg-card mb-8">
        <h1 className="text-2xl font-semibold mb-2">{task.title}</h1>
        <span className="inline-block text-xs px-2 py-1 rounded-full bg-default text-muted mb-4">
          {task.category}
        </span>
        <p className="text-sm text-foreground mb-4">{task.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted block">Budget</span>
            <span className="font-semibold">${task.budget}</span>
          </div>
          <div>
            <span className="text-muted block">Deadline</span>
            <span className="font-semibold">
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-muted block">Client</span>
            <span className="font-semibold">{task.client_email}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-default p-6 bg-card">
        <h2 className="text-lg font-semibold mb-4">Submit a Proposal</h2>

        {alreadyApplied || success ? (
          <p className="text-sm text-green-400">
            ✓ You have already submitted a proposal for this task.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-muted block mb-1">
                Your Email
              </label>
              <input
                type="email"
                value={session?.user?.email || ""}
                disabled
                className="w-full rounded-lg border border-default bg-background px-4 py-2 text-sm outline-none opacity-60"
              />
            </div>

            <div>
              <label className="text-sm text-muted block mb-1">
                Proposed Budget (USD)
              </label>
              <input
                type="number"
                min="1"
                value={proposedBudget}
                onChange={(e) => setProposedBudget(e.target.value)}
                placeholder="e.g. 100"
                className="w-full rounded-lg border border-default bg-background px-4 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-muted block mb-1">
                Estimated Days to Complete
              </label>
              <input
                type="number"
                min="1"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(e.target.value)}
                placeholder="e.g. 5"
                className="w-full rounded-lg border border-default bg-background px-4 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-muted block mb-1">
                Cover Note
              </label>
              <textarea
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                rows={4}
                placeholder="Tell the client why you're a great fit for this task..."
                className="w-full rounded-lg border border-default bg-background px-4 py-2 text-sm outline-none resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="self-start px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Proposal"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}