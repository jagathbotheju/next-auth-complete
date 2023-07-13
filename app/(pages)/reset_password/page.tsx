"use client";
import { resetPasswordWithCredentials } from "@/app/actions/authActions";
import Button from "@/components/Button";
import { toast } from "react-toastify";

interface Props {
  searchParams: {
    token: string;
  };
}

const ResetPasswordPage = ({ searchParams }: Props) => {
  const handleResetPassword = (formData: FormData) => {
    const password = formData.get("password") as string;
    resetPasswordWithCredentials(searchParams.token, password).then((res) => {
      if (res.message) {
        toast.success(res.message);
      }
    });
  };

  return (
    <div className="flex flex-col px-10">
      <h2 className="font-bold text-2xl">Reset Password</h2>

      <form
        action={handleResetPassword}
        className="mt-10 flex flex-col max-w-xl gap-5"
      >
        <input
          type="password"
          name="password"
          className="p-2 outline-none"
          placeholder="Password"
          required
        />
        <Button value="Reset Password" />
      </form>
    </div>
  );
};

export default ResetPasswordPage;
