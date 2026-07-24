"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/app/actions/profile";
import SaveButton from "./SaveButton";

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
  const [name, setName] = useState(user.name ?? "");
  const [username, setUsername] = useState(user.username ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      await updateProfile({
        name,
        username,
        phone,
      });

      alert("Profile Updated");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">Full Name</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Username</label>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Phone</label>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <SaveButton loading={isPending} />
    </form>
  );
}
