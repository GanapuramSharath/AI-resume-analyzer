import PricingCard from "./PricingCard";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "1 Resume Analysis",
      "ATS Score",
      "Basic Suggestions",
      "Email Support",
    ],
    buttonText: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    features: [
      "Unlimited Analysis",
      "AI Resume Rewrite",
      "Priority Support",
      "Cover Letter Generator",
    ],
    buttonText: "Upgrade Now",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section className="max-w-6xl mx-auto py-28 px-6">
      <div className="text-center">
        <p className="text-blue-600 font-semibold uppercase tracking-widest">
          Pricing
        </p>

        <h2 className="text-5xl font-bold mt-3">Choose Your Plan</h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Start for free and upgrade whenever you're ready to unlock AI-powered
          resume optimization.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-16">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </section>
  );
}
