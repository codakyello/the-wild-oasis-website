import { updateBookingAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function UpdateReservationForm({
  maxCapacity,
  numGuests,
  observations,
  bookingId,
}) {
  return (
    <div className="max-w-[130rem] mx-auto px-[3.2rem]">
      <form
        action={updateBookingAction}
        className="bg-primary-900 py-8 px-[4.8rem] text-[1.8rem] flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <SubmitButton label="Update reservation" pendingLabel="Updating..." />

        <input name="bookingId" defaultValue={bookingId} hidden />
      </form>
    </div>
  );
}

export default UpdateReservationForm;
