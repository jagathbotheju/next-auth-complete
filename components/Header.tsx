import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import SignOut from "./SignOut";

const Header = async () => {
  const session = await getServerSession(authOptions);
  //console.log({ session });

  return (
    <header className="flex justify-end items-center gap-x-4 px-10 py-5">
      <Link href="/">Home</Link>
      <Link href="/protected/client">Protected Client</Link>
      <Link href="/protected/server">Protected Server</Link>

      {session ? (
        <>
          <Link href="/profile/client">Profile Client</Link>
          <Link href="/profile/server">Profile Server</Link>
          <Link href="/dashboard">Admin Dashboard</Link>
          <SignOut />
        </>
      ) : (
        <>
          <Link href="/signin">SignIn</Link>
        </>
      )}
    </header>
  );
};

export default Header;
