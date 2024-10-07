"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-[3rem] font-semibold">Something went wrong!</h1>
      <p className="text-[1.8rem]">
        Please try again later or refresh the page.
      </p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-[1.8rem]"
      >
        Try again!
      </button>
    </main>
  );
}
