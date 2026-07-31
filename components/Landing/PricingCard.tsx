import Link from "next/link";
import UpgradeButton from "@/components/UpgradeButton";

type PricingCardProps = {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  href?: string;
  featured?: boolean;
};

export default function PricingCard({
  name,
  price,
  features,
  buttonText,
  href,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-3xl border p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        featured
          ? "border-slate-800 bg-slate-900 text-white"
          : "border-gray-200 bg-white shadow-sm"
      }`}
    >
      <h3 className="text-3xl font-bold">{name}</h3>

      <p className="mt-6 text-6xl font-extrabold">{price}</p>

      <p className={`mt-2 ${featured ? "text-gray-300" : "text-gray-500"}`}>
        Per month
      </p>

      <ul className="mt-10 space-y-5">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="text-xl text-green-500">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {featured ? (
        <UpgradeButton />
      ) : (
        <Link
          href={href!}
          className="mt-10 block w-full rounded-xl bg-black py-3 text-center font-semibold text-white transition hover:bg-gray-800"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
