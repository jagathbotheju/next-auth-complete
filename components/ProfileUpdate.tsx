"use client";

import { updateUser } from "@/app/actions/authActions";
import { toast } from "react-toastify";
import Button from "./Button";

const ProfileUpdate = ({ update }: { update: any }) => {
  const handleAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    if (name && image) {
      if (update) {
        //when update() is run client side, the page will re-render
        //server side will not re-render
        update({ name, image });
      }
      const res = await updateUser(name, image);
      if (res.message) {
        toast.success(res.message);
      }
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <h2 className="font-bold text-2xl my-5">Update Profile</h2>

      <form action={handleAction} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="outline-none p-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image"
          required
          className="outline-none p-2"
        />
        <Button value="Update Profile" />
        {/* <button className="bg-amber-500 py-2 px-4 rounded-md text-black">
          Update Profile
        </button> */}
      </form>
    </div>
  );
};

export default ProfileUpdate;
