"use client";

interface ProfileAvatarProps {
  image?: string | null;
  name: string;
}

export default function ProfileAvatar({ image, name }: ProfileAvatarProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="h-24 w-24 rounded-full border object-cover"
      />
    );
  }

  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
      {initials}
    </div>
  );
}
