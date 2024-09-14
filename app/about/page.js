import Image from "next/image";
import Link from "next/link";
import About1 from "@/public/about1.jpg";
import About2 from "@/public/about2.jpg";
import { getCabins } from "../_lib/data-service";

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="max-w-[130rem] px-[3.2rem] py-[4.8rem] mx-auto grid grid-cols-5 gap-x-24 gap-y-32 text-[1.8rem] items-center">
      <div className="col-span-3">
        <h1 className="text-[3.6rem] mb-10 text-accent-400 font-medium">
          Welcome to The Elegant Escape
        </h1>

        <div className="space-y-8">
          <p>
            Where nature`s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it`s not just about the luxury cabins.
            It`s about the experience of reconnecting with nature and enjoying
            simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you`ll find in the surrounding mountains. Wander
            through lush forests, breathe in the fresh air, and watch the stars
            twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It`s a place to slow down, relax, and feel
            the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={About1}
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      <div className="col-span-2">
        <Image src={About2} alt="Family that manages The Elegant Escape" />
      </div>

      <div className="col-span-3">
        <h1 className="text-[3.6rem] mb-[4rem] text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, The Elegant Escape has been a cherished family-run
            retreat. Started by our grandparents, this haven has been nurtured
            with love and care, passing down through our family as a testament
            to our dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Elegant
            Escape, blending the timeless beauty of the mountains with the
            personal touch only a family business can offer. Here, you&apos;re
            not just a guest; you&apos;re part of our extended family. So join
            us at The Elegant Escape soon, where tradition meets tranquility,
            and every visit is like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block mt-[1.6rem] bg-accent-500 px-8 py-5 text-primary-800 text-[1.8rem] font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
