"use client";
import { Check, Clock, CreditCard, ListCheck, ListCheckLock, Plus } from "@gravity-ui/icons";
import { useEffect, useState } from 'react';
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ClientDashboardOverview() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(`http://localhost:5000/tasks?email=${session.user.email}`)
      .then(res => res.json())
      .then(data => {
        setTasks(Array.isArray(data) ? data : data.tasks || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, [session]);

  const totalTasks = tasks.length;
  const openTasks = tasks.filter(t => t.status === 'open').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const totalSpent = tasks.reduce((sum, t) => t.status === 'Completed' ? sum + t.budget : sum, 0);

  const stats = [
    { title: "Total Tasks", value: totalTasks, color: "bg-blue-500", icon: <ListCheckLock size={20} /> },
    { title: "Open Tasks", value: openTasks, color: "bg-orange-500", icon: <Clock size={20} /> },
    { title: "In Progress", value: inProgressTasks, color: "bg-emerald-500", icon: <Check size={20} /> },
    { title: "Total Spent", value: `$${totalSpent}`, color: "bg-purple-500", icon: <CreditCard size={20} /> },
  ];

  if (loading) return <div className="p-10 text-center">Loading your dashboard...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Client Dashboard</h1>
          <p className="text-gray-500">Manage your tasks and find talented freelancers</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/client/post-task')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Post New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border border-default">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted text-sm">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} text-white p-2 rounded-lg`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Recent Tasks</h2>
        {tasks.length === 0 ? (
          <div className="bg-card p-12 rounded-2xl border border-default text-center">
            <div className="text-muted mb-4 flex justify-center"><ListCheck size={48} /></div>
            <h3 className="text-xl font-bold">No tasks yet</h3>
            <p className="text-muted mb-6">Post your first task to find talented freelancers</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-default overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-default">
                <tr>
                  <th className="p-4">Task Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Budget</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task._id} className="border-t border-default">
                    <td className="p-4">{task.title}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-default rounded text-sm">{task.status}</span></td>
                    <td className="p-4">${task.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}