"use client";

interface Props {
  user: {
    name: string | null;
    username: string | null;
  };

  profile: {
    phone: string | null;
  } | null;
}

export default function PersonalInfoForm({ user, profile }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">Full Name</label>
        <input
          value={user.name ?? ""}
          readOnly
          className="w-full rounded-lg border p-3 bg-gray-100"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Username</label>
        <input
          value={user.username ?? ""}
          readOnly
          className="w-full rounded-lg border p-3 bg-gray-100"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Phone</label>
        <input
          value={profile?.phone ?? ""}
          readOnly
          className="w-full rounded-lg border p-3 bg-gray-100"
        />
      </div>
    </div>
  );
}
