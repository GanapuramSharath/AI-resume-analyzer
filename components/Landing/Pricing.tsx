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
    href: "/register",
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
    <section id="pricing" className="max-w-6xl mx-auto py-28 px-6">
      <div className="text-center">
        <p className="text-blue-600 font-semibold uppercase tracking-widest">
          Pricing
        </p>

        <h2 className="mt-3 text-5xl font-bold">Choose Your Plan</h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Start for free and upgrade whenever You&apos;re ready to unlock
          AI-powered resume optimization.
        </p>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </section>
  );
}
