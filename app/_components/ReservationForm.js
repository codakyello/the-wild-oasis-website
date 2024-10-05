"use client";
import { createBookingAction } from "../_lib/actions";
import { useReservation } from "./ReservationContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user, settings }) {
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [numGuests, setNumGuests] = useState();

  const { range, totalPrice, totalNights, resetRange, setTotalPrice } =
    useReservation();

  const { maxCapacity, regularPrice, discount } = cabin;

  const { breakFastPrice } = settings;

  useEffect(() => {
    if (hasBreakfast) {
      setTotalPrice(
        (regularPrice - discount) * totalNights +
          breakFastPrice * numGuests * totalNights
      );
    } else {
      console.log(regularPrice, discount, totalNights);
      setTotalPrice((regularPrice - discount) * totalNights);
    }
  }, [range, totalNights, numGuests, regularPrice, hasBreakfast]);

  return (
    <div>
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center ">
        <p>Logged in as {user?.fullName}</p>

        <div className="flex gap-4 items-center">
          <div className="h-[3.2rem] relative aspect-square rounded-full">
            <Image
              fill
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="object-cover"
              src={user?.image}
              alt={user?.fullName}
            />
          </div>

          <p>{user?.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBookingAction(formData);
          resetRange();
        }}
        className="py-10 px-16 text-[1.8rem] flex gap-5 flex-col "
      >
        <div className="space-y-2">
          <label className="mb-4 inline-block" htmlFor="numGuests">
            How many guests?
          </label>
          <select
            name="numGuests"
            value={numGuests}
            onChange={(e) => {
              console.log(e.target.value);
              setNumGuests(e.target.value || 0);
            }}
            id="numGuests"
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num} {num === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="mb-4 inline-block" htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex gap-3 items-center">
          {numGuests ? (
            <>
              <input
                type="checkbox"
                id="hasBreakfast"
                name="hasBreakfast"
                value={hasBreakfast}
                onChange={() => {
                  setHasBreakfast((prev) => !prev);
                }}
              />
              <label htmlFor="hasBreakfast">Include Breakfast</label>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-end items-center gap-6">
          {!(range?.from && range?.to) ? (
            <p className="text-primary-300 text-[1.6rem]">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton label="Reserve now" pendingLabel={"Reserving"} />
          )}
        </div>

        <input className="hidden" defaultValue={cabin._id} name="cabinId" />
        <input
          required
          className="hidden"
          value={range?.from}
          name="startDate"
        />
        <input required className="hidden" value={range?.to} name="endDate" />
        <input
          required
          className="hidden"
          value={totalPrice}
          name="totalPrice"
        />

        <input
          required
          className="hidden"
          value={totalNights}
          name="numNights"
        />
      </form>
    </div>
  );
}

export default ReservationForm;
