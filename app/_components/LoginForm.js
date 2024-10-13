"use client";
import SignInButton from "./SignInButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "../_lib/actions";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async (email, password) => {
    setLoading(true);
    const res = await loginAction(email, password);

    if (res?.status !== "error") {
      router.push("/account");
    } else {
      toast.error("Incorrect email || password");
    }
    setLoading(false);
  };

  return (
    <div className="scale-[1.01] bg-primary-900 py-[3.2rem] px-[4.8rem]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          handleLogin(email, password);
        }}
        className="mb-5  text-[1.8rem] flex gap-[2.4rem] flex-col "
      >
        <div className="space-y-2">
          <label htmlFor="my-email">Email address</label>
          <input
            name="email"
            id="my-email"
            type="email"
            required
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="my-password">Password</label>
          <input
            name="password"
            id="my-password"
            type="password"
            required
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

        <div className="flex mt-5 justify-end items-center gap-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-accent-500 px-[3.2rem] py-[1.4rem] text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      <Link
        href={"/signup"}
        className="flex text-accent-500 justify-end text-[1.3rem]"
      >
        Dont have an account? Signup
      </Link>
      <div className="flex gap-4 items-center mt-[2rem] mb-[2.5rem]">
        <div className="h-[1px] flex-1 bg-[#dddddd3e]"></div>
        <span className="text-[1.4rem]">OR</span>
        <div className="flex-1 h-[1px] bg-[#dddddd3e]"></div>
      </div>
      <SignInButton />
    </div>
  );
}

export default LoginForm;
