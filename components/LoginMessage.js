import Link from "next/link";

function LoginMessage({ user }) {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-[2rem] py-[4.8rem] self-center">
        Please{" "}
        <Link href="/login" className="underline text-accent-500">
          login{" "}
        </Link>
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
