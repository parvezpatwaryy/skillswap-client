export default function BrowseFreelancers() {
  const freelancers = [
    { name: "freelancer user 3", jobs: "1 jobs", desc: "I am cool", skill: "python", rate: "$29/hr" },
    { name: "freelancer user 2", jobs: "1 jobs", desc: "I am the best", skill: "Next js", rate: "$40/hr" },
    { name: "freelancer user 1", jobs: "0 jobs", desc: "I am a good freelancer", skill: "React", rate: "$50/hr" },
    { name: "shan", jobs: "0 jobs", desc: "I am good", skill: "react, nodejs", rate: "$20/hr" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl text-black font-bold">Browse Freelancers</h1>
        <p className="text-gray-500">Find skilled professionals for your tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {freelancers.map((freelancer, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold">
                {freelancer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-lg text-black">{freelancer.name}</h3>
                <p className="text-xs text-gray-500">💼 {freelancer.jobs}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{freelancer.desc}</p>
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mb-4">
              {freelancer.skill}
            </span>
            <p className="font-bold text-orange-600 text-lg">{freelancer.rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}