import Image from "next/image";
import Link from "next/link";
import AppLogo from "@/public/about1.jpg";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={AppLogo}
        quality={100}
        height="60"
        width="60"
        alt="The Elegant Escape"
      />
      <span className="text-[2rem] font-semibold text-primary-100">
        The Elegant Escape
      </span>
    </Link>
  );
}

export default Logo;
