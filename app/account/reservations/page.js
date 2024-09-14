import ReservationCard from "@/app/_components/ReservationCard";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default function Page() {
  // CHANGE
  const bookings = [];

  return (
    <div className="max-w-[130rem] mx-auto px-[3.2rem]">
      <h2 className="font-semibold text-[2.4rem] text-accent-400 mb-[1.75rem]">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-[1.8rem]">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
