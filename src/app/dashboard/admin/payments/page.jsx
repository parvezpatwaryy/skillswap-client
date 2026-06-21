"use client";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/payments")
      .then(res => res.json())
      .then(data => setPayments(data));
  }, []);

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="p-2">Client Email</th>
          <th className="p-2">Freelancer Email</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Date</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr key={p._id} className="border-b">
            <td className="p-2">{p.client_email}</td>
            <td className="p-2">{p.freelancer_email}</td>
            <td className="p-2">${p.amount}</td>
            <td className="p-2">{p.paid_at}</td>
            <td className="p-2">{p.payment_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}