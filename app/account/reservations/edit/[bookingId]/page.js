import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;
  const {
    numGuests,
    observations,
    cabin: { maxCapacity },
  } = await getBooking(bookingId);

  return (
    <div>
      <h2 className="font-semibold text-[2.4rem] text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <UpdateReservationForm
        numGuests={numGuests}
        observations={observations}
        maxCapacity={maxCapacity}
        bookingId={bookingId}
      />
    </div>
  );
}
