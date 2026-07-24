"use client";

import ProfileCard from "./ProfileCard";
import SocialLinksForm from "./SocialLinksForm";

interface SocialLinksProps {
  profile: {
    github: string | null;
    linkedin: string | null;
    portfolio: string | null;
  } | null;
}

export default function SocialLinks({ profile }: SocialLinksProps) {
  return (
    <ProfileCard title="Social Links">
      <SocialLinksForm profile={profile} />
    </ProfileCard>
  );
}
