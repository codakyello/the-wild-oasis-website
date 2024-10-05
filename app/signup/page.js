import SignInButton from "../_components/SignInButton";
import LoginForm from "@/app/_components/LoginForm";
import SignUpForm from "../_components/SignUpForm";
import SelectCountry from "../_components/SelectCountry";

export const metadata = {
  title: "Signup",
};
export default function Page() {
  return (
    <div className="max-w-[50rem] px-[2rem] mx-auto mt-[4rem] items-center">
      <h2 className="text-[3rem] font-semibold mb-[2rem]">Get Started Now!</h2>
      <SignUpForm />
    </div>
  );
}
