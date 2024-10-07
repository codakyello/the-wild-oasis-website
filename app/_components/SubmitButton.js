"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label, pendingLabel, loading }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-end items-center gap-6">
      <button
        type="submit"
        className="bg-accent-500 px-[3.2rem] py-[1.6rem] text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        disabled={pending || loading}
      >
        {pending || loading ? pendingLabel : label}
      </button>
    </div>
  );
}
