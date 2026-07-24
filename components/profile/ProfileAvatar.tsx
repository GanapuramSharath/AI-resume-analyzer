"use client";

import Image from "next/image";

interface ProfileAvatarProps {
  image?: string | null;
  name: string;
}

export default function ProfileAvatar({ image, name }: ProfileAvatarProps) {
  const initials =
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-gray-100">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={96}
          height={96}
          className="h-full w-full object-cover"
          unoptimized
        />
      ) : (
        <span className="text-3xl font-bold text-white bg-blue-600 flex h-full w-full items-center justify-center">
          {initials}
        </span>
      )}
    </div>
  );
}
