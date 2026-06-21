"use client";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast"; 
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [role, setRole] = useState("client");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");

    const loadingToast = toast.loading("Creating account...");

    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        image,
        role,
        callbackURL: "/",
      }, {
        onSuccess: () => {
          toast.dismiss(loadingToast);
          toast.success("Account created successfully!");
          e.target.reset();
          router.push("/");
        },
        onError: (ctx) => {
          toast.dismiss(loadingToast);
          toast.error(ctx.error.message || "Registration failed!");
          console.error("Error details:", ctx.error);
        },
      });
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <Toaster position="top-center" reverseOrder={false} /> 
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Register</h2>

        <div className="mb-4">
          <label className="block mb-2 text-slate-700 font-medium">Name</label>
          <input type="text" name="name" placeholder="Your full name" required className="w-full text-black px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-slate-700 font-medium">Email</label>
          <input type="email" name="email" placeholder="Enter your email" required className="w-full text-black px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-slate-700 font-medium">Image URL</label>
          <input type="text" name="image" placeholder="Paste your image URL" className="w-full text-black px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-slate-700 font-medium">Password</label>
          <input type="password" name="password" placeholder="At least 6 chars" required className="w-full text-black px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="mb-6">
          <label className="block mb-3 text-slate-700 font-medium">Select Role</label>
          <div className="flex gap-8">
            <label className="flex items-center gap-2 text-slate-700">
              <input type="radio" name="role" value="client" defaultChecked onChange={(e) => setRole(e.target.value)} /> Client
            </label>
            <label className="flex items-center gap-2 text-slate-700">
              <input type="radio" name="role" value="freelancer" onChange={(e) => setRole(e.target.value)} /> Freelancer
            </label>
          </div>
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300">
          Register
        </button>

        <div className="relative my-6 flex justify-center">
          <span className="bg-white px-4 text-slate-500">OR</span>
        </div>

        <button
          type="button"
          onClick={async () => {
             await authClient.signIn.social({ provider: "google" });
          }}
          className="w-full flex items-center justify-center gap-3 border border-slate-300 bg-white text-slate-800 py-3 rounded-lg hover:bg-slate-100 transition"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;