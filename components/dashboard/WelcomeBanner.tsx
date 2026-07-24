import { Sparkles } from "lucide-react";

type WelcomeBannerProps = {
  name: string;
  currentPlan: string;
  analyses: number;
  remaining: number;
};

export default function WelcomeBanner({
  name,
  currentPlan,
  analyses,
  remaining,
}: WelcomeBannerProps) {
  const firstName = name.trim().split(" ")[0];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
      {/* Decorative Background */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-yellow-300" />

            <h2 className="text-4xl font-bold">Welcome back, {firstName} 👋</h2>
          </div>

          <p className="mt-5 text-lg leading-8 text-white/90">
            Ready to improve your resume today?
            <br />
            Upload your latest resume below and receive AI-powered ATS analysis,
            personalized feedback, and improvement suggestions.
          </p>
        </div>

        {/* Right */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatBox
            title="Resume Analyses"
            value={analyses}
            subtitle="Completed"
          />

          <StatBox
            title="Remaining"
            value={remaining}
            subtitle="Available this month"
          />

          <StatBox
            title="Current Plan"
            value={currentPlan}
            subtitle="Upgrade anytime"
          />
        </div>
      </div>
    </section>
  );
}

type StatBoxProps = {
  title: string;
  value: string | number;
  subtitle: string;
};

function StatBox({ title, value, subtitle }: StatBoxProps) {
  return (
    <div className="min-w-[170px] rounded-xl bg-white/10 p-5 text-center backdrop-blur-md">
      <p className="text-sm text-white/80">{title}</p>

      <h3 className="mt-4 text-4xl font-bold">{value}</h3>

      <p className="mt-3 text-xs text-white/70">{subtitle}</p>
    </div>
  );
}
