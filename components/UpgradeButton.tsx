"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    try {
      setLoading(true);

      // Create Razorpay Order
      const res = await fetch("/api/payment", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to create payment.");
      }

      const options = {
        key: data.key,

        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,

        name: "AI Resume",
        description: "AI Resume Pro Plan",

        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            const result = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(result.error);
            }

            alert("🎉 Payment Successful! Welcome to Pro.");

            window.location.reload();
          } catch (error) {
            console.error(error);

            alert("Payment verification failed.");
          }
        },

        modal: {
          ondismiss() {
            console.log("Payment cancelled.");
          },
        },

        theme: {
          color: "#4F46E5",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      alert("Unable to start checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleUpgrade}
      disabled={loading}
      className="mt-6 w-full rounded-xl bg-white py-3 font-semibold text-indigo-700 transition hover:scale-[1.02] hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </span>
      ) : (
        "Upgrade to Pro"
      )}
    </button>
  );
}
