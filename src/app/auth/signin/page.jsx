"use client";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignInPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const loadingToast = toast.loading("Signing in...");

    try {
      await authClient.signIn.email({
        email,
        password,
      }, {
        onSuccess: () => {
          toast.dismiss(loadingToast);
          toast.success("Signed in successfully!");
          router.push("/"); 
        },
        onError: (ctx) => {
          toast.dismiss(loadingToast);
          toast.error(ctx.error.message || "Invalid email or password");
        },
      });
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Sign In</h2>

        <div className="mb-4">
          <label className="block mb-2 text-slate-700 font-medium">Email</label>
          <input type="email" name="email" placeholder="Enter your email" required className="w-full text-black px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-slate-700 font-medium">Password</label>
          <input type="password" name="password" placeholder="Enter your password" required className="w-full text-black px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 font-semibold">
          Sign In
        </button>

        <div className="relative my-6 flex justify-center">
          <span className="bg-white px-4 text-slate-500 text-sm">OR</span>
        </div>

        <button
          type="button"
          onClick={async () => {
            await authClient.signIn.social({ 
                provider: "google",
                callbackURL: "/", 
            });
          }}
          className="w-full flex items-center justify-center gap-3 border border-slate-300 bg-white text-slate-800 py-3 rounded-lg hover:bg-slate-100 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" /></svg>
          Continue with Google
        </button>

        <p className="text-center mt-6 text-slate-600">
          New to Skillswap? <Link href="/auth/signup" className="text-indigo-600 font-semibold hover:underline">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;