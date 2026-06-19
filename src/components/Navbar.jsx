"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); 
  
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/auth/signin";
        },
      },
    });
  };

  return (
    <nav className="bg-slate-950 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-500">
            FreelanceHub
          </Link>
          <ul className="hidden md:flex items-center gap-6">
            <li><Link href="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link href="/browsetasks" className="hover:text-indigo-400">Browse Tasks</Link></li>
            <li><Link href="/freelancers" className="hover:text-indigo-400">Browse Freelancers</Link></li>
            
            <div className="h-6 w-px bg-gray-600"></div>

            {session ? (
              <>
                <li><Link href="/dashboard/client" className="hover:text-indigo-400">Dashboard</Link></li>
                <li><Link href="/dashboard/profile" className="hover:text-indigo-400">Profile</Link></li>
                <li>
                  <Button onClick={handleSignOut} variant="ghost" className="text-white">Logout</Button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth/signin" className="hover:text-indigo-400">Login</Link>
              </li>
            )}
          </ul>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
          <ul className="flex flex-col gap-4 pt-4 border-t border-slate-800">
            <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/browse-tasks" onClick={() => setIsOpen(false)}>Browse Tasks</Link></li>
            <li><Link href="/browse-freelancers" onClick={() => setIsOpen(false)}>Browse Freelancers</Link></li>
            
            {session ? (
              <>
                <li><Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
                <li><Link href="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
                <li>
                  <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth/signin" onClick={() => setIsOpen(false)}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;