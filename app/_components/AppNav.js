import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function AppNav() {
  const session = await auth();
  console.log(session);
  return (
    <nav className="z-10 text-[2rem]">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-6"
            >
              <div className="relative overflow-hidden h-[3.2rem] rounded-full w-[3.2rem]">
                <Image
                  fill
                  className="bg-cover"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referer"
                />
              </div>

              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
