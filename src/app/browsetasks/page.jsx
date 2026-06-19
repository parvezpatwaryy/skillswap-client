'use client';
import { useEffect, useState } from 'react';

export default function BrowseTasks() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch(`http://localhost:5000/tasks?page=${page}&limit=9&search=${search}&category=${category}`, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" }
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data);
      })
      .catch(err => console.error("Fetch Error:", err));
  }, [page, search, category]);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Browse Tasks</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Search tasks by title..." 
          className="border p-3 rounded-lg w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
        <select 
          className="border text-gray-600 p-3 rounded-lg w-full md:w-1/3" 
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(0);
          }}
        >
          <option value="all">All Categories</option>
          <option value="Design">Design</option>
          <option value="Development">Development</option>
          <option value="Writing">Writing</option>
        </select>
      </div>
      
      {/* টাস্ক গ্রিড */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found matching your criteria!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div key={task._id} className="border p-5 rounded-xl shadow-lg bg-gray-900 text-white transition hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <p className="text-gray-400 mb-2">Category: {task.category}</p>
              <p className="text-lg font-bold text-green-400 mb-2">${task.budget}</p>
              <p className="text-sm text-gray-500">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-10 flex gap-4 justify-center">
        <button 
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          onClick={() => setPage(prev => prev + 1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}