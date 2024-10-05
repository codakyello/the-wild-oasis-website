import { auth } from "../_lib/auth";

export default async function Page() {
  const session = await auth();
  console.log("session", session);

  const firstName = session.user.fullName.split(" ").at(0);
  return (
    <div className=" max-w-[130rem] mx-auto px-[3.2rem]">
      <h2 className="font-semibold text-[2.4rem] text-accent-400 mb-[2.8rem]">
        Welcome, {firstName}
      </h2>
    </div>
  );
}
