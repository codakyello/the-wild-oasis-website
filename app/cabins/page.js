// "use client";
import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Loading from "./loading";
import Filter from "../_components/Filter";

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  const filters = searchParams;
  return (
    <div className="max-w-[130rem] mx-auto px-[3.2rem] py-[4.8rem]">
      <h1 className="text-[3.6rem] mb-[2rem] text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-[1.8rem] mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature`s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="flex justify-end mb-[3.2rem]">
        <Filter />
      </div>

      <Suspense fallback={<Loading />} key={filters.capacity}>
        <CabinList filters={filters} />
      </Suspense>
    </div>
  );
}
