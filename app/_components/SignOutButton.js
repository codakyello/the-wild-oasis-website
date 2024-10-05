import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <button
      onClick={() => signOutAction()}
      className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full"
    >
      <ArrowRightOnRectangleIcon className="h-[2rem] w-[2rem] text-primary-600" />
      <span className="hidden md:block">Sign out</span>
    </button>
  );
}

export default SignOutButton;
