"use client";
import Link from "next/link";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";
import { signUpAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function SignUpForm({ children }) {
  return (
    <div className=" bg-primary-900 py-8 px-12">
      <form
        action={signUpAction}
        className="mb-5  text-[1.8rem] flex gap-[2.4rem] flex-col "
      >
        <div className="space-y-2">
          <label htmlFor="my-fullName">*FullName</label>
          <input
            name="fullName"
            id="my-fullName"
            type="name"
            required
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="my-email">*Email address</label>
          <input
            name="email"
            id="my-email"
            type="email"
            required
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="my-password">*Password</label>
          <input
            name="password"
            id="my-password"
            type="password"
            required
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="my-confirm-password">*Confirm Password</label>
          <input
            name="confirmPassword"
            id="my-confirm-password"
            type="password"
            required
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">*Where are you from?</label>
          </div>

          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="my-nationalId">NationalID</label>
          <input
            name="nationalId"
            id="my-nationalId"
            type="text"
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>
        <Link
          href={"/sign-up"}
          className="flex text-accent-500 justify-end text-[1.4rem]"
        >
          Have an account? Login
        </Link>
        <div className="flex">
          <SubmitButton label={"SignUp"} pendingLabel={<SpinnerMini />} />
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
