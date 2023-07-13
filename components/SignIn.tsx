"use client";

import { signIn } from "next-auth/react";
import Button from "./Button";
import { forgotPasswordWithCredentials } from "@/app/actions/authActions";
import { toast } from "react-toastify";

interface Props {
  callbackUrl: string;
}

const SignIn = ({ callbackUrl }: Props) => {
  const handleCredentialsLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);

    await signIn("credentials", { email, password, callbackUrl });
  };

  const handleForgotPassword = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const res = await forgotPasswordWithCredentials(email);
    if (res?.message) toast.success(res.message);
  };

  return (
    <div>
      {/* signin google */}
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="py-2 px-4 bg-amber-500 rounded-md text-black font-bold"
      >
        Google
      </button>

      {/* signin credentials */}
      <h2 className="text-xl font-bold mt-10">SignIn with Credentials</h2>
      <form
        action={handleCredentialsLogin}
        className="mt-1 flex flex-col gap-4 max-w-2xl"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="p-2 outline-none"
        />
        <Button value="Credentials" />
      </form>

      {/* forgot password */}
      <h2 className="text-xl font-bold mt-10 mb-1">Forgot Password</h2>
      <form
        action={handleForgotPassword}
        className="mt-1 flex flex-col gap-4 max-w-2xl"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 outline-none"
        />

        <Button value="Forgot Password" />
      </form>
    </div>
  );
};

export default SignIn;
