"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BrowseTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("status", "open");
    if (search) params.append("search", search);
    if (category !== "all") params.append("category", category);

    fetch(`http://localhost:5000/tasks?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(Array.isArray(data) ? data : data.tasks || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Tasks fetch failed:", err);
        setLoading(false);
      });
  }, [search, category]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Browse Tasks</h1>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by task title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-default bg-card px-4 py-2 text-sm outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg text-gray-500 border border-default bg-card px-4 py-2 text-sm outline-none"
        >
          <option value="all">All Categories</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
          <option value="Development">Development</option>
          <option value="Marketing">Marketing</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {loading ? (
        <p className="text-muted">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-muted">No open tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <Link
              key={task._id}
              href={`/dashboard/freelancer/browse-tasks/${task._id}`}
              className="rounded-xl border border-default p-5 bg-card flex flex-col gap-2 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <span className="text-xs text-muted">{task.category}</span>
              <div className="flex justify-between text-sm mt-2">
                <span>${task.budget}</span>
                <span className="text-muted">
                  Due: {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
              <span className="text-xs text-muted">
                Client: {task.client_email}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}