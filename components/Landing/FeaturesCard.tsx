import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <Icon className="w-8 h-8 text-blue-600 mb-4" />

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
