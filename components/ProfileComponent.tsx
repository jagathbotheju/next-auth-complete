"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import ProfileUpdate from "./ProfileUpdate";
import ProfileChangePassword from "./ProfileChangePassword";

interface Props {
  user?: User;
  update?: any;
}

const ProfileComponent = ({ user, update }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure className="relative w-full h-[300px]">
          <Image
            src={user?.image || "/images/blank-profile.svg"}
            alt="Shoes"
            fill
            className="top-0 left-0 relative w-full h-full object-contain"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{user?.name}</h2>
          <p className="font-semibold">{user?.email}</p>
          <p className="font-semibold">{user?.role}</p>
          <p className="font-semibold">{user?.provider}</p>
        </div>
      </div>

      <div className="flex flex-row gap-5 mt-5">
        <ProfileUpdate update={update} />
        {user?.provider === "credentials" && <ProfileChangePassword />}
      </div>
    </div>
  );
};

export default ProfileComponent;
