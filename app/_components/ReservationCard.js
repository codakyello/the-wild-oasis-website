import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    _id: bookingId,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabin: { name, image },
  } = booking;

  return (
    <div className="flex border min-h-[14rem] border-primary-800">
      <div className="relative self-stretch w-[18rem]">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover bg-bottom border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-[2.4rem] py-[1.2rem] flex gap-2 flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-[2rem] font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {booking.status === "checked-in" ? (
            <span className="bg-orange-600 text-yellow-200 h-[2.8rem] px-[1.2rem] uppercase text-[1.2rem] font-bold flex items-center rounded-sm">
              Ongoing
            </span>
          ) : isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-[2.8rem] px-[1.2rem] uppercase text-[1.2rem] font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-[2.8rem] px-3 uppercase text-[1.2rem] font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-[1.8rem] text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-col md:flex-row gap-2 md:gap-[2rem] mt-auto items-baseline">
          <p className="text-[2rem] font-semibold text-accent-400">
            ${totalPrice}
          </p>

          <p className="text-[1.8rem] text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="text-[1.4rem] text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${bookingId}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-[1.2rem] hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-[2rem] w-[2rem] text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={bookingId} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
