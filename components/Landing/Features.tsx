import FeatureCard from "./FeaturesCard";
import { Sparkles, FileCheck, ScanSearch } from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "ATS Optimization",
    description: "Improve ATS compatibility.",
  },
  {
    icon: FileCheck,
    title: "Formatting Check",
    description: "Check resume formatting.",
  },
  {
    icon: Sparkles,
    title: "AI Rewrites",
    description: "Rewrite with AI.",
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto py-24 px-6">
      <div className="text-center">
        <p className="text-blue-600 font-semibold uppercase tracking-wider">
          Features
        </p>

        <h2 className="text-5xl font-bold mt-3">How It Works</h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Everything you need to optimize your resume and improve your chances
          of landing interviews.
        </p>
      </div>

      <div className="grid gap-8 mt-16 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
}
