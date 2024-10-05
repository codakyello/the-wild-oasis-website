import SignInButton from "../_components/SignInButton";
import LoginForm from "@/app/_components/LoginForm";
import SignUpForm from "../_components/SignUpForm";
import SelectCountry from "../_components/SelectCountry";

export const metadata = {
  title: "Signup",
};
export default function Page() {
  return (
    <div className="max-w-[50rem] mx-auto mt-[4rem] items-center">
      <h2 className="text-[3rem] font-semibold mb-[2rem]">Get Started Now!</h2>
      <SignUpForm>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </SignUpForm>
    </div>
  );
}
