"use client";
import { signUpWithCredentials } from "@/app/actions/authActions";
import SignUp from "@/components/SignUp";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const handleSignUpCredentials = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (name && email && password) {
      const res = await signUpWithCredentials({ name, email, password });
      if (res?.message) toast.success(res.message);
      console.log(res);
    }
  };

  return (
    <div className="flex flex-col px-10">
      <h2 className="text-2xl font-bold my-5">SignUp with Next Auth</h2>

      <form
        action={handleSignUpCredentials}
        className="flex flex-col gap-2 w-[500px]"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="outline-none p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="outline-none p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="outline-none p-2"
        />

        <div>
          <button className="btn btn-primary mt-10">Register</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
