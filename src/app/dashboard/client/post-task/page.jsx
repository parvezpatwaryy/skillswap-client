'use client';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client";
import { useState } from 'react';

export default function PostTaskPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePostTask = async (e) => {
    e.preventDefault();
    setError("");

    if (!session?.user?.email) {
      setError("You must be logged in to post a task.");
      return;
    }

    const form = e.target;

    const taskData = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      budget: parseFloat(form.budget.value),
      deadline: form.deadline.value,
      client_email: session.user.email,
      status: "open", // ছোট হাতের, Browse Tasks filter এর সাথে মিলিয়ে
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });

      const data = await res.json();

      if (data.insertedId) {
        router.push('/dashboard/client/my-tasks');
      } else {
        setError("Failed to post task. Please try again.");
      }
    } catch (err) {
      console.error("Post task failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Post a New Task</h1>
      <p className="text-muted mb-8">Describe your task and set a budget to find freelancers</p>

      <form onSubmit={handlePostTask} className="bg-card border border-default rounded-2xl p-8">
        <div className="mb-6">
          <label className="block font-medium mb-2">Task Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g., Design a landing page"
            className="w-full border border-default bg-background p-3 rounded-lg outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Category</label>
          <select
            name="category"
            className="w-full border border-default bg-background p-3 rounded-lg outline-none"
          >
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            required
            placeholder="Provide a detailed description..."
            className="w-full border border-default bg-background p-3 rounded-lg h-32 outline-none resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2">Budget (USD)</label>
            <input
              name="budget"
              type="number"
              min="1"
              required
              placeholder="500"
              className="w-full border border-default bg-background p-3 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Deadline</label>
            <input
              name="deadline"
              type="date"
              required
              className="w-full border border-default bg-background p-3 rounded-lg outline-none"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-default rounded-lg font-medium hover:bg-default"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Task"}
          </button>
        </div>
      </form>
    </div>
  );
}