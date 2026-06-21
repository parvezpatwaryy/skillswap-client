"use client";
import { useEffect, useState } from "react";

export default function ManageTasksPage() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(Array.isArray(data) ? data : data.tasks));
  };

  useEffect(() => { loadTasks(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    loadTasks();
  };

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="p-2">Title</th>
          <th className="p-2">Client</th>
          <th className="p-2">Status</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id} className="border-b">
            <td className="p-2">{task.title}</td>
            <td className="p-2">{task.client_email}</td>
            <td className="p-2">{task.status}</td>
            <td className="p-2">
              <button
                onClick={() => handleDelete(task._id)}
                className="px-3 py-1 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}