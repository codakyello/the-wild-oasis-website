"use client";
import { useState } from "react";
import { createBookingAction } from "./_lib/actions";

function ReservationForm({ cabin, user }) {
  const [loading, setLoading] = useState(false);
  // CHANGE

  const { maxCapacity } = cabin;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const res = await createBookingAction(formData);

    if (res?.status !== "error") toast.success("Profile updated successfully");
    else toast.error(res.message);

    setLoading(false);
  };

  return (
    <div className="">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center ">
        <p>Logged in as {user?.fullName}</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-[3.2rem] rounded-full"
            src={user?.image}
            alt={user?.name}
          />
          <p>{user?.name}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        // action={createBookingAction}
        className="py-10 px-16 text-[1.8rem] flex gap-5 flex-col "
      >
        <div className="space-y-2">
          <label className="mb-4 inline-block" htmlFor="numGuests">
            How many guests?
          </label>
          <select
            name="numGuests"
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

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-[1.6rem]">
            Start by selecting dates
          </p>

          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
