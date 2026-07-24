interface ProfileCardProps {
  title: string;
  children: React.ReactNode;
}

export default function ProfileCard({ title, children }: ProfileCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">{title}</h2>

      {children}
    </div>
  );
}
