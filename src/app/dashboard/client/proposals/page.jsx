'use client';
import { useEffect, useState } from 'react';

export default function ManageProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  // বর্তমানে হার্ডকোড করা ইমেইল, পরবর্তীতে অ্যাথেন্টিকেশন থেকে আনবেন
  const userEmail = "client1@test.com"; 

  useEffect(() => {
    // ব্যাকএন্ড থেকে প্রপোজাল ফেচ করা
    fetch(`http://localhost:5000/proposals?email=${userEmail}`)
      .then(res => res.json())
      .then(data => {
        setProposals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching proposals:", err);
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Manage Proposals</h1>
      <p className="text-gray-500 mb-12">Review and respond to freelancer proposals</p>

      {proposals.length === 0 ? (
        // প্রপোজাল না থাকলে যে ডিজাইনটি আপনি দিয়েছেন
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-600">No proposals yet</h2>
          <p className="text-gray-500 mt-1">Proposals from freelancers will appear here</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {proposals.map((proposal) => (
            <div key={proposal._id} className="border p-6 rounded-xl shadow-sm bg-white">
              <h3 className="font-bold text-lg">Freelancer: {proposal.freelancer_email}</h3>
              <p className="text-gray-600">Details: {proposal.proposal_details}</p>
              <p className="font-semibold mt-2">Budget: ${proposal.proposal_price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}