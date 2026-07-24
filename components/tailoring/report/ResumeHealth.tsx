type ResumeHealthProps = {
  health?: {
    overall: number;
    formatting: string;
    atsFriendly: boolean;
    grammar: string;
    length: string;
  };
};

export default function ResumeHealth({ health }: ResumeHealthProps) {
  if (!health) {
    return (
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-8 text-2xl font-bold">Resume Health</h2>

        <p className="text-gray-500">No resume health available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold">Resume Health</h2>

      <div className="space-y-6">
        <HealthRow
          label="Formatting"
          value={health.formatting}
          good={
            health.formatting === "Excellent" || health.formatting === "Good"
          }
        />

        <HealthRow
          label="ATS Friendly"
          value={health.atsFriendly ? "Yes" : "No"}
          good={health.atsFriendly}
        />

        <HealthRow
          label="Grammar"
          value={health.grammar}
          good={health.grammar === "Good"}
        />

        <HealthRow
          label="Length"
          value={health.length}
          good={health.length === "Good"}
        />
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Overall Health</span>

          <span
            className={`text-2xl font-bold ${
              health.overall >= 80
                ? "text-green-600"
                : health.overall >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
            }`}
          >
            {health.overall}%
          </span>
        </div>
      </div>
    </div>
  );
}

type HealthRowProps = {
  label: string;
  value: string;
  good: boolean;
};

function HealthRow({ label, value, good }: HealthRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-lg">{label}</span>

      <span
        className={`font-semibold ${good ? "text-green-600" : "text-red-600"}`}
      >
        {good ? "✓" : "✗"} {value}
      </span>
    </div>
  );
}
