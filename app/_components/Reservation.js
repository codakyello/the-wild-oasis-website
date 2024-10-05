import LoginMessage from "@/components/LoginMessage";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import ReservationForm from "@/app/_components/ReservationForm";
import DateSelector from "./DateSelector";
import { auth } from "../_lib/auth";

async function Reservation({ cabin }) {
  //
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin._id),
  ]);
  const session = await auth();

  if (!settings || !bookedDates) return null;

  return (
    <div className="grid gap-[4rem] md:gap-0 grid-cols-1 md:grid-cols-2 items-stretch  border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          settings={settings}
          user={session.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
