type SectionScoresProps = {
  scores?: {
    summary: number;
    skills: number;
    projects: number;
    experience: number;
    education: number;
  };
};

export default function SectionScores({ scores }: SectionScoresProps) {
  if (!scores) {
    return (
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-8 text-2xl font-bold">Section Scores</h2>

        <p className="text-gray-500">No section scores available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold">Section Scores</h2>

      <div className="space-y-6">
        <ScoreBar title="Summary" score={scores.summary} />

        <ScoreBar title="Skills" score={scores.skills} />

        <ScoreBar title="Projects" score={scores.projects} />

        <ScoreBar title="Experience" score={scores.experience} />

        <ScoreBar title="Education" score={scores.education} />
      </div>
    </div>
  );
}

type ScoreBarProps = {
  title: string;
  score: number;
};

function ScoreBar({ title, score }: ScoreBarProps) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="font-medium">{title}</span>

        <span className="font-semibold">{score}%</span>
      </div>

      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${
            score >= 80
              ? "bg-green-500"
              : score >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
          }`}
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}
