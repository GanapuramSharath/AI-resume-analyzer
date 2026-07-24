type PricingCardProps = {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  featured?: boolean;
};

export default function PricingCard({
  name,
  price,
  features,
  buttonText,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-3xl border p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        featured
          ? "bg-slate-900 text-white border-slate-800"
          : "bg-white border-gray-200 shadow-sm"
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
            <span className="text-green-500 text-xl">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`mt-10 w-full rounded-xl py-3 font-semibold transition ${
          featured
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
