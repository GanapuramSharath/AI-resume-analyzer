import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

type RewriteSuggestion = {
  section?: string;
  before?: string;
  after?: string;
  reason?: string;
  priority?: "High" | "Medium" | "Low";
};

type Props = {
  rewrites?: RewriteSuggestion[];
};

export default function RewriteSuggestions({ rewrites = [] }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <Sparkles className="h-7 w-7 text-blue-600" />

        <div>
          <h2 className="text-2xl font-bold">AI Rewrite Suggestions</h2>

          <p className="text-sm text-gray-500">
            Improve ATS score and recruiter readability.
          </p>
        </div>
      </div>

      {rewrites.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <Sparkles className="mx-auto mb-4 h-10 w-10 text-gray-300" />

          <h3 className="text-lg font-semibold">Great job!</h3>

          <p className="mt-2 text-gray-500">
            No rewrite suggestions were generated.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {rewrites.map((rewrite, index) => (
            <RewriteCard key={index} rewrite={rewrite} />
          ))}
        </div>
      )}
    </div>
  );
}

function RewriteCard({ rewrite }: { rewrite: RewriteSuggestion }) {
  const priority = rewrite.priority ?? "Low";

  const priorityStyles = {
    High: {
      badge: "bg-red-100 text-red-700",
      icon: <AlertTriangle className="h-4 w-4" />,
    },

    Medium: {
      badge: "bg-yellow-100 text-yellow-700",
      icon: <AlertTriangle className="h-4 w-4" />,
    },

    Low: {
      badge: "bg-green-100 text-green-700",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
  };

  return (
    <div className="rounded-xl border bg-gray-50 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {rewrite.section || "Resume"}
          </span>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
            priorityStyles[priority].badge
          }`}
        >
          {priorityStyles[priority].icon}
          {priority} Priority
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 font-semibold text-gray-700">Before</h4>

          <div className="rounded-xl border bg-white p-4 text-gray-600">
            {rewrite.before || "No original content available."}
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-green-700">After</h4>

          <div className="rounded-xl border border-green-300 bg-green-50 p-4 text-gray-700">
            {rewrite.after || "No rewritten content available."}
          </div>
        </div>
      </div>

      <div className="my-6 flex justify-center">
        <ArrowRight className="h-6 w-6 text-blue-500" />
      </div>

      <div className="rounded-xl bg-blue-50 p-4">
        <h4 className="mb-2 font-semibold text-blue-700">Why this rewrite?</h4>

        <p className="leading-7 text-gray-700">
          {rewrite.reason || "No explanation provided."}
        </p>
      </div>
    </div>
  );
}
