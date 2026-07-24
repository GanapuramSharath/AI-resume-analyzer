"use client";

import ProfileAvatar from "./ProfileAvatar";

interface AvatarUploadProps {
  image?: string | null;
  name: string;
}

export default function AvatarUpload({ image, name }: AvatarUploadProps) {
  return (
    <div className="flex items-center gap-6 rounded-xl border bg-white p-6 shadow-sm">
      <ProfileAvatar image={image} name={name} />

      <div>
        <h3 className="text-lg font-semibold">{name}</h3>

        <p className="mt-2 text-sm text-gray-500">
          Your profile picture is provided by your Google account.
        </p>
      </div>
    </div>
  );
}
