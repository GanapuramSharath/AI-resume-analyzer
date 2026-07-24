type Props = {
  scores?: Record<string, number>;
};

export default function SectionScores({ scores = {} }: Props) {
  const entries = Object.entries(scores);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Section Scores</h2>

      {entries.length === 0 ? (
        <p className="text-slate-500">No section scores available.</p>
      ) : (
        <div className="space-y-4">
          {entries.map(([key, value]) => (
            <div key={key}>
              <div className="mb-1 flex justify-between">
                <span className="capitalize">{key}</span>

                <span>{value}%</span>
              </div>

              <div className="h-3 rounded bg-slate-200">
                <div
                  className="h-3 rounded bg-blue-600"
                  style={{
                    width: `${value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
