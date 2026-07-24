"use client";

import { Check, RefreshCcw, X } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700">
        <Check size={18} />
        Accept
      </button>

      <button className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700">
        <X size={18} />
        Reject
      </button>

      <button className="flex items-center gap-2 rounded-xl border border-blue-600 px-5 py-3 font-medium text-blue-600 hover:bg-blue-50">
        <RefreshCcw size={18} />
        Regenerate
      </button>
    </div>
  );
}
