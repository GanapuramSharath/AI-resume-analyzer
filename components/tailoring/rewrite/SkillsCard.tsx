type Props = {
  title: string;
  skills?: string[];
  color: "green" | "red";
};

export default function SkillsCard({ title, skills = [], color }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">{title}</h2>

      {skills.length === 0 ? (
        <p className="text-slate-500">No data available.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-full px-3 py-2 text-sm font-medium ${
                color === "green"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
