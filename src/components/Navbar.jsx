"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Auth state
  const user = false; // login হলে true হবে

  return (
    <nav className="bg-slate-950 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-500"
          >
            FreelanceHub
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link href="/" className="hover:text-indigo-400">
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/browse-tasks"
                className="hover:text-indigo-400"
              >
                Browse Tasks
              </Link>
            </li>

            <li>
              <Link
                href="/browse-freelancers"
                className="hover:text-indigo-400"
              >
                Browse Freelancers
              </Link>
            </li>

            <div className="h-6 w-px bg-gray-600"></div>

            {!user ? (
              <li>
                <Link
                  href="/login"
                  className="hover:text-indigo-400"
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-indigo-400"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    href="/profile"
                    className="hover:text-indigo-400"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-4 pt-4 border-t border-slate-800">

            <li>
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/browse-tasks"
                onClick={() => setIsOpen(false)}
              >
                Browse Tasks
              </Link>
            </li>

            <li>
              <Link
                href="/browse-freelancers"
                onClick={() => setIsOpen(false)}
              >
                Browse Freelancers
              </Link>
            </li>

            {!user ? (
              <li>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;