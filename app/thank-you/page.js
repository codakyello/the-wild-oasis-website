import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-6 mt-[1.6rem]">
      <h1 className="text-[3rem] font-semibold">
        Thank you for your reservation!
      </h1>
      <Link
        href="/account/reservations"
        className="underline text-[2rem] text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
