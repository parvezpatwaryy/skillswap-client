'use client';
import { useRouter } from 'next/navigation';

export default function PostTaskPage() {
  const router = useRouter();

  const handlePostTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const taskData = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      budget: form.budget.value,
      deadline: form.deadline.value,
      client_email: "client1@test.com", 
      status: "Open"
    };

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          alert("Task posted successfully!");
          router.push('/dashboard/client/my-tasks');
        }
      });
  };

  return (
    <div className="max-w-4xl text-black mx-auto p-8">
      <h1 className="text-3xl text-white font-bold mb-2">Post a New Task</h1>
      <p className="text-gray-500 mb-8">Describe your task and set a budget to find freelancers</p>

      <form onSubmit={handlePostTask} className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="mb-6">
          <label className="block font-medium mb-2">Task Title</label>
          <input name="title" type="text" required placeholder="e.g., Design a landing page" className="w-full border p-3 rounded-lg outline-none" />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Category</label>
          <select name="category" className="w-full border p-3 rounded-lg outline-none">
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Description</label>
          <textarea name="description" required placeholder="Provide a detailed description..." className="w-full border p-3 rounded-lg h-32 outline-none"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-medium mb-2">Budget (USD)</label>
            <input name="budget" type="number" required placeholder="500" className="w-full border p-3 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block font-medium mb-2">Deadline</label>
            <input name="deadline" type="date" required className="w-full border p-3 rounded-lg outline-none" />
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-50">Cancel</button>
          <button type="submit" className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600">
            Post Task
          </button>
        </div>
      </form>
    </div>
  );
}