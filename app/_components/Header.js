import Logo from "@/app/_components/Logo";
import AppNav from "./AppNav";

function Header() {
  return (
    <header className="border-b border-primary-900 px-[3.2rem] py-[2rem]">
      <div className="flex justify-between items-center  mx-auto">
        <Logo />
        <AppNav />
      </div>
    </header>
  );
}

export default Header;
