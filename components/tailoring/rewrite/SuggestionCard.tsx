"use client";

import ActionButtons from "./ActionButtons";

type Props = {
  suggestion: {
    title: string;
    before: string;
    after: string;
  };
};

export default function SuggestionCard({ suggestion }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="mb-6 text-xl font-bold">{suggestion.title}</h3>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <p className="mb-3 font-semibold text-red-600">Current Resume</p>

          <p className="whitespace-pre-wrap text-slate-700">
            {suggestion.before}
          </p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="mb-3 font-semibold text-green-700">AI Rewrite</p>

          <p className="whitespace-pre-wrap text-slate-800">
            {suggestion.after}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <ActionButtons />
      </div>
    </div>
  );
}
