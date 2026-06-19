'use client';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client'; // আপনার Better Auth ক্লায়েন্ট পাথ

export default function ProfilePage() {
  // Better Auth এর hook ব্যবহার করে সেশন এবং ইউজার ডাটা পাওয়া যাচ্ছে
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div className="text-center p-10">Loading profile...</div>;
  if (!session) return <div className="text-center p-10">Please login to see profile.</div>;

  return (
    <div className="p-8 max-w-2xl text-gray-500 mx-auto bg-white rounded-xl shadow-lg border">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="flex flex-col items-center gap-6">
        {/* Better Auth থেকে ইমেজ এবং নাম সরাসরি পাওয়া যাচ্ছে */}
        <img 
          src={session.user.image || "/default-avatar.png"} 
          alt="Profile" 
          className="w-32 h-32 rounded-full border-4 border-gray-100 object-cover" 
        />
        <div className="w-full space-y-4">
          <div className="border-b pb-2">
            <label className="text-sm text-gray-500">Name</label>
            <p className="text-lg font-medium">{session.user.name}</p>
          </div>
          <div className="border-b pb-2">
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-lg font-medium">{session.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}