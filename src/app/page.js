"use client";
import { motion } from "framer-motion";
import { Briefcase, Users, DollarSign, CheckCircle } from "lucide-react";

// --- DUMMY DATA ---
const tasks = [
  { id: 1, title: "Build a Landing Page", client: "John Doe", category: "Development", budget: 500, deadline: "2026-07-15" },
  { id: 2, title: "Logo Design", client: "Jane Smith", category: "Design", budget: 200, deadline: "2026-06-30" },
];

const freelancers = [
  { name: "Alex Rivet", skills: ["React", "Node"], rating: 4.9, jobs: 45 },
  { name: "Sarah Chen", skills: ["UI/UX", "Figma"], rating: 5.0, jobs: 32 },
];

export default function HomePage() {
  return (
    <main className="space-y-20 py-10">
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold">Get your tasks done by skilled freelancers</motion.h1>
        <p className="text-gray-600 max-w-lg mx-auto">Connect with top-tier professionals to bring your projects to life quickly and efficiently.</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Post a Task</button>
          <button className="border px-6 py-2 rounded-lg">Browse Tasks</button>
        </div>
      </section>

      {/* 2. DYNAMIC SECTION 1: LATEST TASKS */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Latest Featured Tasks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <motion.div whileHover={{ scale: 1.02 }} key={task.id} className="p-6 border rounded-xl shadow-sm">
              <h3 className="font-bold text-xl">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.client} • {task.category}</p>
              <div className="mt-4 flex justify-between font-semibold text-blue-600">
                <span>${task.budget}</span>
                <span>Due: {task.deadline}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC SECTION 2: TOP FREELANCERS */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Top Freelancers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {freelancers.map((f, i) => (
            <div key={i} className="p-6 border rounded-xl text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
              <h3 className="font-bold">{f.name}</h3>
              <p className="text-sm text-gray-500">{f.skills.join(", ")}</p>
              <p className="mt-2 font-bold">{f.rating} ★ ({f.jobs} jobs)</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXTRA: HOW IT WORKS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-black">How It Works</h2> {/* text-black যোগ করা হয়েছে */}
          <div className="flex flex-col md:flex-row justify-around gap-8">
            {['Post a Task', 'Get Proposals', 'Hire and Pay'].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">{i + 1}</div>
                <h4 className="font-bold text-gray-900">{step}</h4> {/* text-gray-900 যোগ করা হয়েছে */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXTRA: PLATFORM STATISTICS */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
        {[{ label: "Total Tasks", val: "1,200+" }, { label: "Total Users", val: "500+" }, { label: "Payouts", val: "$50k+" }].map((stat, i) => (
          <div key={i} className="p-6 border rounded-xl">
            <h4 className="text-2xl font-bold">{stat.val}</h4>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </section>
    </main>
  );
}