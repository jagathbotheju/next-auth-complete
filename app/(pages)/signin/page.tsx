import SignIn from "@/components/SignIn";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl: string;
  };
}

const SignInPage = ({ searchParams }: Props) => {
  return (
    <div className="flex flex-col px-10">
      <h1 className="text-2xl font-bold">SignIn with NextAuth</h1>
      <div className="mt-10">
        <SignIn callbackUrl={searchParams.callbackUrl || "/"} />
      </div>

      <div className="mt-10">
        <Link
          className="py-2 px-4 bg-amber-500 rounded-md text-black font-bold"
          href="/signup"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
