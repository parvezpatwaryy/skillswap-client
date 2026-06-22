"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [payment, setPayment] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMsg("Session ID পাওয়া যায়নি।");
      return;
    }

    const confirmPayment = async () => {
      try {
        const res = await fetch("http://localhost:5000/confirm-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setErrorMsg(data.message || "পেমেন্ট কনফার্ম করা যায়নি।");
          return;
        }

        setPayment(data.payment);
        setStatus("success");
        if (data.payment?.task_id) {
          try {
            const taskRes = await fetch(
              `http://localhost:5000/tasks/${data.payment.task_id}`
            );
            const task = await taskRes.json();
            setTaskTitle(task?.title || "");
          } catch {
            setTaskTitle("");
          }
        }
      } catch (err) {
        console.error("Confirm session failed:", err);
        setStatus("error");
        setErrorMsg("সার্ভারের সাথে সংযোগ করা যায়নি।");
      }
    };

    confirmPayment();
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="size-10 border-2 border-default border-t-foreground rounded-full animate-spin mb-4" />
        <p className="text-muted">পেমেন্ট কনফার্ম হচ্ছে, একটু অপেক্ষা করুন...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="size-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <span className="text-red-400 text-2xl">✕</span>
        </div>
        <h1 className="text-xl font-semibold mb-2">পেমেন্ট কনফার্ম করা যায়নি</h1>
        <p className="text-muted mb-6">{errorMsg}</p>
        <Link
          href="/dashboard/client"
          className="px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium"
        >
          ড্যাশবোর্ডে ফিরে 
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="size-14 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
        <span className="text-green-400 text-2xl">✓</span>
      </div>

      <h1 className="text-2xl font-bold mb-1">পেমেন্ট সফল হয়েছে 🎉</h1>
      <p className="text-muted mb-6">
        আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে এবং টাস্ক "In Progress" তে আপডেট হয়েছে।
      </p>

      <div className="w-full max-w-sm rounded-xl border border-default p-5 text-left mb-6">
        <div className="flex justify-between py-2 border-b border-default">
          <span className="text-muted text-sm">Task</span>
          <span className="font-medium text-sm">{taskTitle || "—"}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-default">
          <span className="text-muted text-sm">Freelancer</span>
          <span className="font-medium text-sm">{payment?.freelancer_email || "—"}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted text-sm">Amount Paid</span>
          <span className="font-semibold text-sm">${payment?.amount}</span>
        </div>
      </div>

      <Link
        href="/dashboard/client"
        className="px-6 py-2.5 rounded-lg bg-black text-white text-sm font-medium"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}