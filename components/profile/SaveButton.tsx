"use client";

interface SaveButtonProps {
  loading?: boolean;
}

export default function SaveButton({ loading }: SaveButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Saving..." : "Save Changes"}
    </button>
  );
}
