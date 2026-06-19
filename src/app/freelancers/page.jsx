"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BrowseFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-freelancers')
      .then(res => res.json())
      .then(data => setFreelancers(data))
      .catch(err => console.error("Error fetching:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
          Browse Our <span className="text-blue-600">Expert Freelancers</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map(f => (
            <motion.div
              whileHover={{ y: -8 }}
              key={f._id}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={f.image}
                  className="w-28 h-28 rounded-full mx-auto border-4 border-blue-50 shadow-md object-cover"
                  alt={f.name}
                />
                <div className="absolute top-0 right-1/3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                  ★ {f.rating}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mt-6 text-gray-800">{f.name}</h2>
              <p className="text-center text-gray-500 mb-6 font-medium">Completed {f.completedJobs} Jobs</p>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {f.skills.map(skill => (
                  <span key={skill} className="bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold border border-indigo-100">
                    {skill}
                  </span>
                ))}
              </div>

              <Link href={`/freelancers/${f._id}`}>
                <button className="w-full mt-8 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition">
                  View Profile
                </button>
              </Link>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseFreelancers;