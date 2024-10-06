import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icon-logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        className="h-[6rem] w-[6rem]"
        quality={100}
        alt="The Elegant Escape logo"
      />
      <span className="hidden md:flex text-xl font-semibold text-primary-100">
        The Elegant Escape
      </span>
    </Link>
  );
}

export default Logo;
