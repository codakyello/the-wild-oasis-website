"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { startOfToday } from "date-fns";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range?.from, end: range?.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const {
    range,
    setRange,
    resetRange,
    totalPrice,
    setTotalNights,
    totalNights,
  } = useReservation();
  const { regularPrice, discount } = cabin;
  const { minBookingLength, maxBookingLength } = settings;

  const displayedRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  useEffect(() => {
    setTotalNights(
      differenceInDays(displayedRange?.to, displayedRange?.from) || 0
    );
  });

  console.log("this is totalNights", totalNights);

  return (
    <div className="flex flex-col justify-between gap-[2rem]">
      <DayPicker
        className="pt-12 place-self-center rdp"
        mode="range"
        selected={displayedRange} // This needs to be a state variable to track the range
        onSelect={setRange} // A function to handle the selected range
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
        min={minBookingLength + 1}
        max={maxBookingLength}
        modifiers={{
          booked: bookedDates, // Modifier for booked dates
          range: {
            start: displayedRange?.from, // Mark start of range
            end: displayedRange?.to, // Mark end of range
          },
        }}
        captionLayout="dropdown"
        numberOfMonths={2} // Show two months at a time
      />

      <div className="flex items-center justify-between px-[3.2rem] py-[2rem] bg-accent-500 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-[2.4rem]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-[2.4rem]">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {totalNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{totalNights}</span>
              </p>
              <p>
                <span className="text-[1.8rem] font-bold uppercase">Total</span>{" "}
                <span className="text-[2.4rem] font-semibold">
                  ${totalPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {displayedRange?.from || displayedRange?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-[1.4rem] font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
