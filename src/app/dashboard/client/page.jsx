import { Check, Clock, CreditCard, ListCheck, ListCheckLock, Plus } from "@gravity-ui/icons";

export default function ClientDashboardOverview() {
  const stats = [
    { title: "Total Tasks", value: "0", sub: "All tasks created", icon: <ListCheckLock size={20} /> },
    { title: "Open Tasks", value: "0", sub: "Awaiting proposals", icon: <Clock size={20} /> },
    { title: "In Progress", value: "0", sub: "Currently being worked on", icon: <Check size={20} /> },
    { title: "Total Spent", value: "$0", sub: "Total money paid", icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="p-8 text-black bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Client Dashboard</h1>
          <p className="text-gray-500">Manage your tasks and find talented freelancers</p>
        </div>
        <button className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
          <Plus size={18} /> Post New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="bg-orange-50 bg-blue-500 p-2 rounded-lg">{stat.icon}</div>
            </div>
            <p className="text-xs text-gray-400 mt-4">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Tasks Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Recent Tasks</h2>
        <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center flex flex-col items-center">
          <div className="text-gray-400 mb-4"><ListCheck size={48} /></div>
          <h3 className="text-xl font-bold">No tasks yet</h3>
          <p className="text-gray-500 mb-6">Post your first task to find talented freelancers</p>
          <button className="bg-blue-400 text-white px-8 py-2 rounded-lg font-medium">Post a Task</button>
        </div>
      </div>
    </div>
  );
}