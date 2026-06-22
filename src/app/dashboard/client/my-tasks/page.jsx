'use client';
import { useEffect, useState } from 'react';
import { useSession } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';

export default function MyTasksPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    if (!session?.user?.email) return;
    fetchTasks();
  }, [session, search, category]);

  const fetchTasks = () => {
    fetch(`http://localhost:5000/tasks?email=${session.user.email}&search=${search}&category=${category}`)
      .then(res => res.json())
      .then(data => {
        setTasks(Array.isArray(data) ? data : data.tasks || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  };

  const handleDelete = async (task) => {
    if (task.status !== "open") {
      alert("Cannot delete: this task already has an accepted proposal or is in progress.");
      return;
    }
    if (!confirm("Are you sure you want to delete this task?")) return;

    const res = await fetch(`http://localhost:5000/tasks/${task._id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.deletedCount > 0) {
      fetchTasks();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-muted">Manage all your posted tasks</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/client/post-task')}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600"
        >
          + Post New Task
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search tasks..."
          className="border border-default bg-card p-2 rounded-lg w-full md:w-1/3 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border text-gray-500 border-default bg-card p-2 rounded-lg w-32 outline-none"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
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
        <p className="text-muted">You haven't posted any tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map(task => (
            <div key={task._id} className="border border-default rounded-xl p-6 bg-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{task.title}</h2>
                  <p className="text-muted text-sm mt-1">{task.description}</p>
                </div>
                <span className="bg-orange-500/10 text-orange-400 text-xs px-3 py-1 rounded-full font-medium capitalize">
                  {task.status || "open"}
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted mt-6 border-t border-default pt-4">
                <span className="font-medium">{task.category}</span>
                <span className="font-bold">${task.budget}</span>
                <span>📅 {new Date(task.deadline).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-3 mt-4">
                {task.status === "open" && (
                  <>
                    <button
                      onClick={() => router.push(`/dashboard/client/my-tasks/edit/${task._id}`)}
                      className="px-4 py-1.5 text-sm rounded-lg border border-default hover:bg-default"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task)}
                      className="px-4 py-1.5 text-sm rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}