"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete your Booking?")) {
      startTransition(() => onDelete(bookingId));
    }
  }

  return (
    <>
      {!isPending ? (
        <button
          onClick={handleDelete}
          className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
        >
          {" "}
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />{" "}
          <span className="mt-[.4rem]">Delete</span>
        </button>
      ) : (
        <div className="flex flex-grow px-3 items-center justify-center">
          <SpinnerMini />
        </div>
      )}
    </>
  );
}

export default DeleteReservation;
