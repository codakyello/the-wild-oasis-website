"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import {
  updateGuest,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookings,
  createGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  // sign in
  await signIn("google", { redirectTo: "/account" });
}

export async function signUpAction(formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const nationalIDInput = Number(formData.get("nationalID"));

  const nationalID = nationalIDInput ? Number(nationalIDInput) : undefined;
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const fullName = formData.get("fullName");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const email = formData.get("email");
  try {
    await createGuest({
      fullName,
      email,
      password,
      confirmPassword,
      nationalID,
      nationality,
      countryFlag,
    });

    redirect("/signup-successful");
  } catch (err) {
    throw err;
  }
}

export async function loginAction(formData) {
  await signIn("credentials", {
    redirect: false,
    email: formData.email,
    password: formData.password,
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const nationalIDInput = Number(formData.get("nationalID"));

  const nationalID = nationalIDInput ? Number(nationalIDInput) : undefined;
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  await updateGuest({
    countryFlag,
    nationality,
    nationalID,
  });
  revalidatePath("/account/profile");
}

export async function updateBookingAction(formData) {
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);
  const bookingId = formData.get("bookingId");

  const guestBookings = await getBookings();

  const guestBookingsIds = guestBookings.map((booking) => booking._id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  await updateBooking({ numGuests, observations }, bookingId);

  revalidatePath("/account/reservations");
  return redirect("/account/reservations");
}

export async function createBookingAction(formData) {
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);
  const cabinId = formData.get("cabinId");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const totalPrice = Number(formData.get("totalPrice"));
  const numNights = Number(formData.get("numNights"));
  const hasBreakfast = formData.get("hasBreakfast");

  if (!numNights) throw new Error("You did not specify the Number of nights");

  console.log("hasBreakfast", hasBreakfast);

  await createBooking({
    numGuests,
    observations,
    cabinId,
    startDate,
    endDate,
    totalPrice,
    numNights,
    hasBreakfast,
  });
  revalidatePath("/account/reservations");
  revalidatePath(`/cabins/${cabinId}`);
  return redirect("/thank-you");
}

export async function deleteBookingAction(bookingId) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const guestBookings = await getBookings();

    const guestBookingsIds = guestBookings.map((booking) => booking._id);

    if (!guestBookingsIds.includes(bookingId))
      throw new Error("You are not allowed to delete this booking");

    await deleteBooking(bookingId);
    revalidatePath("/account/reservations");
  } catch (err) {
    throw err;
  }
}
