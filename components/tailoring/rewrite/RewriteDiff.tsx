"use client";

import SuggestionCard from "./SuggestionCard";

type RewriteItem = {
  title: string;
  before: string;
  after: string;
};

type Props = {
  rewrites: RewriteItem[];
};

export default function RewriteDiff({ rewrites }: Props) {
  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Resume Rewrite</h2>

        <p className="mt-2 text-slate-500">
          Review every AI suggestion before applying it.
        </p>
      </div>

      <div className="space-y-8">
        {rewrites.map((item, index) => (
          <SuggestionCard key={index} suggestion={item} />
        ))}
      </div>
    </section>
  );
}
