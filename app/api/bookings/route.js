import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // Import the revalidate function
import { createBooking } from "@/app/_lib/data-service";

// Handle POST requests for creating bookings
export async function POST(request) {
  const formData = await request.formData();
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);
  const cabinId = formData.get("cabinId");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const totalPrice = Number(formData.get("totalPrice"));
  const numNights = Number(formData.get("numNights"));

  if (!numNights) {
    console.log("no numNights");
    return NextResponse.json(
      { message: "You did not specify the Number of nights" },
      { status: 400 } // Bad Request status code
    );
  }
  // Create the booking
  await createBooking({
    numGuests,
    observations,
    cabinId,
    startDate,
    endDate,
    totalPrice,
    numNights,
  });

  revalidatePath("/account/reservations");
  revalidatePath("/cabins");

  return NextResponse.json({ message: "Booking created successfully!" });
}
