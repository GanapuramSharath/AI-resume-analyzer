import { Search } from "lucide-react";

type MissingKeywordsCardProps = {
  keywords: string[];
};

export default function MissingKeywordsCard({
  keywords,
}: MissingKeywordsCardProps) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-yellow-100 p-3">
          <Search className="text-yellow-600" size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Missing Keywords</h2>

          <p className="text-gray-500">Keywords commonly expected by ATS</p>
        </div>
      </div>

      {keywords.length === 0 ? (
        <div className="rounded-2xl bg-green-50 border border-green-100 p-5">
          <p className="text-green-700 font-medium">
            🎉 Great! No important keywords are missing.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="rounded-full bg-yellow-100 px-5 py-3 text-sm font-semibold text-yellow-800"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
