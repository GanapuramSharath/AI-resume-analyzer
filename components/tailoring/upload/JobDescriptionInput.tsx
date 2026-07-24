"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function JobDescriptionInput({ value, onChange }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">Job Description</h2>

      <textarea
        rows={16}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the complete job description..."
        className="w-full rounded-xl border p-4 outline-none focus:border-blue-500"
      />

      <div className="mt-2 text-right text-sm text-slate-400">
        {value.length} characters
      </div>
    </div>
  );
}
