export default async function FreelancerProfile({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/freelancer/${id}`, { cache: 'no-store' });
  const freelancer = await res.json();

  if (!freelancer) {
    return <div className="text-center mt-20 text-red-500 font-bold">Freelancer profile not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-[3rem] shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img 
              src={freelancer.image} 
              alt={freelancer.name} 
              className="w-40 h-40 rounded-3xl border-[6px] border-white shadow-xl object-cover transform hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute -bottom-3 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              PRO
            </div>
          </div>
          <h1 className="text-5xl font-extrabold mt-8 text-gray-900 tracking-tight">{freelancer.name}</h1>
          <p className="text-indigo-600 font-semibold mt-2 text-lg">Expert Freelancer</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-bold text-gray-900">{freelancer.completedJobs || 0}</p>
            <p className="text-gray-500 font-medium">Completed Jobs</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-bold text-gray-900">4.9</p>
            <p className="text-gray-500 font-medium">Client Rating</p>
          </div>
        </div>
        <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{freelancer.bio}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Skills</h2>
          <div className="flex flex-wrap gap-3">
            {freelancer.skills?.map((skill, index) => (
              <span key={index} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 cursor-pointer transition-colors shadow-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}