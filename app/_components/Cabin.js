import ReservationForm from "@/app/ReservationForm";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "./TextExpander";

function Cabin({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="relative h-[42rem] scale-[1.15] -translate-x-3">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="bg-cover absolute"
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-[7.2rem] mb-5 md:translate-x-[-254px] bg-primary-950 md:p-6 md:pb-1 md:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-[1.8rem] text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-[2rem] w-[2rem] text-primary-600" />
            <span className="text-[1.8rem]">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-[2rem] w-[2rem] text-primary-600" />
            <span className="text-[1.8rem]">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-[2rem] w-[2rem] text-primary-600" />
            <span className="text-[1.8rem]">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
