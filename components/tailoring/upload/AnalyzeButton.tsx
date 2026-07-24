"use client";

type Props = {
  loading: boolean;
  onClick: () => void;
};

export default function AnalyzeButton({ loading, onClick }: Props) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-10 py-4 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
}
