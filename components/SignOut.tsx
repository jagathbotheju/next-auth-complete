"use client";

import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button
      onClick={() => signOut()}
      className="py-2 px-4 bg-amber-500 rounded-md"
    >
      SignOut
    </button>
  );
};

export default SignOut;
