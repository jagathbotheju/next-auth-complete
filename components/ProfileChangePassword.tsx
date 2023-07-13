import { changePasswordWithCredentials } from "@/app/actions/authActions";
import Button from "./Button";
import { toast } from "react-toastify";

const ProfileChangePassword = () => {
  const handleChangePassword = async (formData: FormData) => {
    const old_pass = formData.get("old_pass") as string;
    const new_pass = formData.get("new_pass") as string;

    const res = await changePasswordWithCredentials(old_pass, new_pass);
    if (res.message) {
      toast.success(res.message);
    }
  };

  return (
    <div className="flex mt-10 flex-col">
      <h2 className="text-2xl font-bold mb-5">Change Password</h2>
      <form action={handleChangePassword} className="flex flex-col gap-2">
        <input
          type="password"
          name="old_pass"
          placeholder="Old Password"
          required
          className="p-2 outline-none"
        />
        <input
          type="password"
          name="new_pass"
          placeholder="New Password"
          required
          className="p-2 outline-none"
        />
        <Button value="Change Password" />
      </form>
    </div>
  );
};

export default ProfileChangePassword;
