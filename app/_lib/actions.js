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

export async function signInAction() {
  // sign in
  await signIn("google", { redirectTo: "/account" });
}

export async function signUpAction(formData) {
  try {
    const nationalIDInput = Number(formData.get("nationalID"));

    const nationalID = nationalIDInput ? Number(nationalIDInput) : undefined;
    const [nationality, countryFlag] = formData.get("nationality")?.split("%");
    const fullName = formData.get("fullName");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const email = formData.get("email");

    if (nationality === "undefined")
      throw new Error("You did not specify your nationality");

    const data = await createGuest({
      fullName,
      email,
      password,
      confirmPassword,
      nationalID,
      nationality,
      countryFlag,
    });
    console.log(data);
    return { status: "success" };
  } catch (err) {
    console.log(err);
    return { status: "error", message: err.message };
  }
}

export async function loginAction(email, password) {
  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (err) {
    console.log("in error", err);
    return { status: "error", message: err.message };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  try {
    const nationalIDInput = Number(formData.get("nationalID"));

    const nationalID = nationalIDInput ? Number(nationalIDInput) : undefined;
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!nationality) throw new Error("You did not specify your nationality");

    const data = await updateGuest({
      countryFlag,
      nationality,
      nationalID,
    });
    revalidatePath("/account/profile");
    return { status: "success", data };
  } catch (err) {
    return { status: "error", message: err.message };
  }
}

export async function updateBookingAction(formData) {
  try {
    const numGuests = formData.get("numGuests");
    const observations = formData.get("observations").slice(0, 1000);
    const bookingId = formData.get("bookingId");

    const guestBookings = await getBookings();

    const guestBookingsIds = guestBookings.map((booking) => booking.bookingId);

    if (!guestBookingsIds.includes(bookingId))
      throw new Error("You are not allowed to update this booking");

    await updateBooking({ numGuests, observations }, bookingId);

    revalidatePath("/account/reservations");
  } catch (err) {
    return { status: "error", message: err.message };
  }
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

  try {
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
  } catch (err) {
    return { status: "error", message: err.message };
  }
}

export async function deleteBookingAction(bookingId) {
  try {
    const guestBookings = await getBookings();

    const guestBookingsIds = guestBookings.map((booking) => booking.bookingId);

    if (!guestBookingsIds.includes(bookingId))
      throw new Error("You are not allowed to delete this booking");

    await deleteBooking(bookingId);
    revalidatePath("/account/reservations");
  } catch (err) {}
}
