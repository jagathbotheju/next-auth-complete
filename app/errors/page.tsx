"use client";
import { useRouter, useSearchParams } from "next/navigation";

const ErrorsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errMsg = searchParams.get("error");

  console.log(errMsg);

  return (
    <div className="mt-20 mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-red-500">Errors : {errMsg}</h1>
      <button className="btn btn-primary" onClick={() => router.back()}>
        Try Again
      </button>
    </div>
  );
};

export default ErrorsPage;
