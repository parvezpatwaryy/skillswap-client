"use client";
import { useEffect, useState } from 'react';

export default function BrowseTasks() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // হেডার দিয়ে ক্যাশ ক্লিয়ার করা হয়েছে
    fetch(`http://localhost:5000/tasks?page=${page}&limit=9`, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" }
    })
      .then(res => res.json())
      .then(data => {
        console.log("UI-তে সেট করা ডেটা:", data);
        setTasks(data);
      })
      .catch(err => console.error("Fetch Error:", err));
  }, [page]);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Latest Featured Tasks</h2>
      
      {/* ডেটা চেক */}
      {tasks.length === 0 ? (
        <p>No tasks found!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div key={task._id} className="border p-4 rounded-lg shadow-md bg-gray-900 text-white">
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-400">Category: {task.category}</p>
              <p className="text-lg font-bold mt-2 text-green-400">${task.budget}</p>
              <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <button 
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Previous
        </button>
        <button 
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}