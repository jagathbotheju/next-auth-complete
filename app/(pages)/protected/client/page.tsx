"use client";

import ProfileComponent from "@/components/ProfileComponent";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

const ProtectedClientPage = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  console.log(session);

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold py-5">
        This is a <span className="text-red-400">Protected Client</span> Page
      </h1>
      <ProfileComponent user={user} />
    </div>
  );
};

export default ProtectedClientPage;
