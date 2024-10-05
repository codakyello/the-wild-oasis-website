// app/signup-successful/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupSuccessful() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="mt-8 flex flex-col items-center">
      <h1 className="text-[3.6rem] font-bold">Sign up Successful!</h1>
      <p className="mt-4 text-[1.8rem]">
        You will be redirected to the login page shortly...
      </p>
    </div>
  );
}
