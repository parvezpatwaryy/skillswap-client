'use client';
import { useEffect, useState } from 'react';

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
  // স্টেটগুলো ডিক্লেয়ার করা জরুরি
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const userEmail = "client1@test.com";

  useEffect(() => {
    fetchTasks();
  }, [search, category]); // এখানে search ও category যোগ করতে হবে

  const fetchTasks = () => {
    // URL এ প্যারামিটারগুলো যোগ করা হয়েছে
    fetch(`http://localhost:5000/tasks?email=${userEmail}&search=${search}&category=${category}`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          alert("Task deleted successfully!");
          fetchTasks();
        }
      });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Tasks</h1>
          <p className="text-gray-500">Manage all your posted tasks</p>
        </div>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600">
          + Post New Task
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        {/* সার্চ ইনপুটে onChange যুক্ত করা হয়েছে */}
        <input 
          type="text" 
          placeholder="Search tasks..." 
          className="border p-2 rounded-lg w-full md:w-1/3 outline-none" 
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="border text-gray-600 p-2 rounded-lg w-32 outline-none" 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Web Development">Web Development</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <p>You haven't posted any tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map(task => (
            <div key={task._id} className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition">
              {/* কার্ডের বাকি অংশ আগের মতোই রাখুন */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-orange-600">{task.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                </div>
                <span className="bg-orange-50 text-orange-500 text-xs px-3 py-1 rounded-full font-medium">
                  {task.status || "Open"}
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500 mt-6 border-t pt-4">
                <span className="font-medium text-gray-700">{task.category}</span>
                <span className="font-bold text-gray-900">$ {task.budget}</span>
                <span>📅 {new Date(task.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
