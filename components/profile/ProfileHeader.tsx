"use client";

import ProfileAvatar from "./ProfileAvatar";

interface ProfileHeaderProps {
  name: string;
  username?: string;
  email: string;
  image?: string | null;
}

export default function ProfileHeader({
  name,
  username,
  email,
  image,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-6 border-b pb-6">
      <ProfileAvatar image={image} name={name} />

      <div>
        <h1 className="text-3xl font-bold">{name}</h1>

        {username && <p className="text-gray-500">@{username}</p>}

        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
}
