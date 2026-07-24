type Props = {
  suggestions?: any[];
};

export default function OverallSuggestions({ suggestions = [] }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Overall Suggestions</h2>

      {suggestions.length === 0 ? (
        <p className="text-slate-500">No suggestions generated.</p>
      ) : (
        <div className="space-y-4">
          {suggestions.map((item, index) => (
            <div key={index} className="rounded-xl bg-blue-50 p-4">
              {typeof item === "string" ? item : item.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
