import SignInButton from "../_components/SignInButton";
import LoginForm from "@/app/_components/LoginForm";

export const metadata = {
  title: "Login",
};
export default function Page() {
  return (
    <div className="flex flex-col gap-[4rem] mt-[4rem] items-center">
      <h2 className="text-[3rem] font-semibold">
        Sign in to access your guest area
      </h2>

      <LoginForm />
    </div>
  );
}
