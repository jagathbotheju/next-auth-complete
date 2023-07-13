"use client";

import ProfileChangePassword from "@/components/ProfileChangePassword";
import ProfileComponent from "@/components/ProfileComponent";
import ProfileUpdate from "@/components/ProfileUpdate";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

const ProfileClientPage = () => {
  const { data: session, update } = useSession();
  const user = session?.user as User;

  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-2xl font-bold py-5">
        This is a <span className="text-red-400">Profile Client</span> Page
      </h1>
      <ProfileComponent user={user} update={update} />
    </div>
  );
};

export default ProfileClientPage;
