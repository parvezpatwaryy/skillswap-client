"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "open") {
          setError("This task can no longer be edited because it's not open anymore.");
        }
        setTitle(data.title || "");
        setCategory(data.category || "Design");
        setDescription(data.description || "");
        setBudget(data.budget || "");
        setDeadline(data.deadline ? data.deadline.split("T")[0] : "");
        setStatus(data.status || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Task fetch failed:", err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const updatedTask = {
      title,
      category,
      description,
      budget: parseFloat(budget),
      deadline,
    };

    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (res.ok) {
        router.push("/dashboard/client/my-tasks");
      } else {
        setError("Failed to update task. Please try again.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-muted">Loading task...</p>;
  }

  if (status !== "open") {
    return (
      <div className="max-w-2xl">
        <p className="text-red-400 mb-4">
          This task can no longer be edited because its status is "{status}".
        </p>
        <button
          onClick={() => router.push("/dashboard/client/my-tasks")}
          className="px-6 py-2 rounded-lg border border-default hover:bg-default"
        >
          Back to My Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Task</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-default rounded-2xl p-8 flex flex-col gap-4"
      >
        <div>
          <label className="block font-medium mb-2">Task Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-default bg-background p-3 rounded-lg outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-default bg-background p-3 rounded-lg outline-none"
          >
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-default bg-background p-3 rounded-lg h-32 outline-none resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Budget (USD)</label>
            <input
              type="number"
              min="1"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-default bg-background p-3 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Deadline</label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-default bg-background p-3 rounded-lg outline-none"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-default rounded-lg font-medium hover:bg-default"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}