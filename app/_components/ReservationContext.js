"use client";
import { useContext, createContext, useState, useEffect } from "react";

const ReservationContext = createContext();
const initialState = { from: null, to: null };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const [totalPrice, setTotalPrice] = useState();
  const [regularPrice, setRegularPrice] = useState();
  const [hasBreakfast, setHasBreakfast] = useState();

  const [totalNights, setTotalNights] = useState();

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
        totalNights,
        totalPrice,
        setRegularPrice,
        setTotalPrice,
        setTotalNights,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context)
    throw new Error("Cannot use reservation context outside of its provider");
  return context;
}

export { ReservationProvider, useReservation };
