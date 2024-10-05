import ReservationFilter from "@/app/_components/ReservationFilter";
import ReservationList from "@/app/_components/ReservationList";
import { getBookings } from "@/app/_lib/data-service";
import { isFuture, isPast, isBefore, isAfter } from "date-fns";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page({ searchParams }) {
  const filter = searchParams;
  // CHANGE

  const bookings = await getBookings();

  let filteredBookings = bookings;

  if (filter.status === "past") {
    filteredBookings = bookings.filter(
      (booking) =>
        isPast(new Date(booking.startDate)) && booking.status !== "checked-in" // Only past bookings
    );
  } else if (filter.status === "upcoming") {
    filteredBookings = bookings.filter(
      (booking) => isFuture(new Date(booking.startDate)) // Only upcoming bookings
    );
  } else {
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-in" // Only checked-in bookings
    );
  }

  return (
    <div className="max-w-[130rem] mx-auto px-[3.2rem]">
      <div className="flex justify-end mb-[3.2rem]">
        <ReservationFilter />
      </div>

      <h2 className="font-semibold text-[2.4rem] text-accent-400 mb-[1.75rem]">
        Your reservations
      </h2>

      {filteredBookings.length === 0 ? (
        <p className="text-[1.8rem]">
          You have no {filter.status || "ongoing"} reservations. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <div>
          <ReservationList bookings={filteredBookings} />
        </div>
      )}
    </div>
  );
}
