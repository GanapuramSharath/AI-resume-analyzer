import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProfileHeader from "@/components/profile/ProfileHeader";
import AvatarUpload from "@/components/profile/AvatarUpload";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const avatar = user.image;

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-8">
      <ProfileHeader
        image={avatar}
        name={user.name ?? ""}
        username={user.username ?? ""}
        email={user.email ?? ""}
      />

      <AvatarUpload image={avatar} name={user.name ?? ""} />

      
    </div>
  );
}
