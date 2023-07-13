import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileComponent from "@/components/ProfileComponent";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

const ProfileServerPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-2xl font-bold py-5">
        This is a <span className="text-red-400">Profile Server</span> Page
      </h1>
      <ProfileComponent user={user} />
    </div>
  );
};

export default ProfileServerPage;
