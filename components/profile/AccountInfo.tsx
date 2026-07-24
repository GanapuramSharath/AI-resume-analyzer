"use client";

import ProfileCard from "./ProfileCard";
import PersonalInfoForm from "./PersonalInfoForm";

interface Props {
  user: {
    name: string | null;
    username: string | null;
  };

  profile: {
    phone: string | null;
  } | null;
}

export default function AccountInfo({ user, profile }: Props) {
  return (
    <ProfileCard title="Account Information">
      <PersonalInfoForm user={user} profile={profile} />
    </ProfileCard>
  );
}
