import Reservation from "@/app/_components/Reservation";
import { getCabin } from "@/app/_lib/data-service";

import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import Cabin from "@/app/_components/Cabin";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}
export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  // In React apps we return a generic Error Component
  if (!cabin) return null;

  return (
    <div className="max-w-[115rem] mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-[4.8rem] font-semibold text-center text-accent-400 mb-[4rem]">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
