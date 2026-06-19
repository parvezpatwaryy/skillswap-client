"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/latest-tasks').then(res => res.json()).then(setTasks);
    fetch('http://localhost:5000/top-freelancers').then(res => res.json()).then(setFreelancers);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-5xl font-extrabold mb-6">Get your tasks done by skilled freelancers</h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Connect with top-rated experts for your next project. Quality work guaranteed.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition">Post a Task</button>
            <button className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-700 transition">Browse Tasks</button>
          </div>
        </motion.div>
      </section>

      {/* Latest Tasks Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">Latest Featured Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tasks.map(t => (
            <motion.div whileHover={{ y: -10 }} key={t._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t.category || 'Development'}</span>
              <h3 className="text-xl font-bold my-3 text-gray-700">{t.title}</h3>
              <div className="flex justify-between items-center mt-6">
                <span className="text-lg font-bold text-green-600">${t.budget}</span>
                <span className="text-sm text-gray-400">Deadline: {t.deadline ? new Date(t.deadline).toLocaleDateString() : 'N/A'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Freelancers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">Our Top Freelancers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {freelancers.map(f => (
              <motion.div whileHover={{ scale: 1.05 }} key={f._id} className="p-6 border border-gray-100 rounded-3xl bg-gray-50">
                <img src={f.image || '/avatar.png'} className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md mb-4" alt="profile" />
                <h3 className="font-bold text-lg">{f.name}</h3>
                <div className="text-yellow-500 font-bold mt-1">⭐ {f.rating}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;