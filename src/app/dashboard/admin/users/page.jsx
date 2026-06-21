"use client";
import { useEffect, useState } from "react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  useEffect(() => { loadUsers(); }, []);

  const toggleBlock = async (id, isBlocked) => {
    const action = isBlocked ? "unblock" : "block";
    await fetch(`http://localhost:5000/users/${id}/${action}`, { method: "PATCH" });
    loadUsers();
  };

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Role</th>
          <th className="p-2">Status</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="border-b">
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.role}</td>
            <td className="p-2">{user.isBlocked ? "Blocked" : "Active"}</td>
            <td className="p-2">
              <button
                onClick={() => toggleBlock(user._id, user.isBlocked)}
                className={`px-3 py-1 rounded text-white ${user.isBlocked ? "bg-green-600" : "bg-red-600"}`}
              >
                {user.isBlocked ? "Unblock" : "Block"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}