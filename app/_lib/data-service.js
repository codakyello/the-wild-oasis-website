import { notFound } from "next/navigation";
import { getToken } from "../_utils/utils";
import { eachDayOfInterval } from "date-fns";

const URL = "https://the-elegant-escape-4iqb.vercel.app/api/v1";
const DEV_URL = "http://localhost:3001/api/v1";
/////////////
// AUTH
export async function login(email, password) {
  const res = await fetch(`${URL}/guests/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  const {
    token,
    data: { user },
  } = data;

  return { user, token };
}
export async function authorize(token) {
  try {
    if (!token) return false;

    const res = await fetch(`${URL}/verifyToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("");
    return true;
  } catch (err) {
    return false;
  }
}

export async function getGuest(email) {
  const res = await fetch(`${URL}/guests/email/?email=${email}`, {
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  const {
    data: { guest },
  } = data;

  return guest;
}
export async function createGuest(user) {
  console.log(user);
  const res = await fetch(`${URL}/guests/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  const {
    data: { guest },
  } = data;
  return guest;
}

export async function updateGuest(formData) {
  const token = await getToken();

  const res = await fetch(`${URL}/guests/updateMe`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  console.log(data);

  if (!res.ok) throw Error(data.message);
  const {
    data: { guest },
  } = data;
  return guest;
}

export async function signIn(email) {
  try {
    const res = await fetch(`${URL}/guests/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },

      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) throw new Error(data.message);

    const {
      data: { user },
      token,
    } = data;
    return { user, token };
  } catch (err) {
    console.log("An error occured");
    console.error(err.message);
  }
}
/////////////
// GET

export async function getCabinPrice(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCabin(id) {
  try {
    const res = await fetch(
      `${URL}/cabins/${id}`,

      {
        next: {
          revalidate: 60,
        },
      }
    );

    const data = await res.json();
    // data.error || data.data

    if (!res.ok) {
      throw new Error(data.error);
    }

    const {
      data: { cabin },
    } = data;

    return cabin;
  } catch (err) {
    notFound();
  }
}

export const getCabins = async function (filters) {
  let query = "";
  if (filters?.capacity) {
    switch (filters.capacity) {
      case "small":
        query += "maxCapacity[lte]=3";
        break;
      case "medium":
        query += "maxCapacity[gte]=4&maxCapacity[lte]=7";
        break;
      case "large":
        query += "maxCapacity[gte]=8";
        break;
      default:
        break;
    }
  }

  try {
    const res = await fetch(`${URL}/cabins?${query}`, {
      next: {
        revalidate: 60,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    const {
      data: { cabins },
    } = data;

    return cabins;
  } catch (err) {
    console.error(err);
  }
};

// Guests are uniquely identified by their email address

export async function getBooking(bookingId) {
  const token = await getToken();
  try {
    const res = await fetch(`${URL}/bookings/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Set the content type to JSON
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const {
      data: { booking },
    } = data;

    return booking;
  } catch (err) {
    notFound();
  }
}

export async function getBookings() {
  try {
    const token = await getToken();

    const res = await fetch(`${URL}/guests/myBookings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure the 'Authorization' key is capitalized
      },
      next: { revalidate: 60 },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    const {
      data: { bookings },
    } = data;

    console.log(bookings);

    return bookings;
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    throw err;
  }
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const res = await fetch(
    `https://the-eleganta-escape.vercel.app/api/v1/cabins/${cabinId}/bookings`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  const {
    data: { bookings },
  } = data;

  const bookedDates = bookings
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  console.log(bookedDates);

  return bookedDates;
}

export async function getSettings() {
  try {
    const res = await fetch(
      `https://the-eleganta-escape.vercel.app/api/v1/settings`,
      {
        next: {
          revalidate: 5,
        },
      }
    );

    const { data, error } = await res.json();
    console.log(data);

    if (!res.ok) throw new Error(error);

    return data.settings;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    if (!res.ok) throw new Error("Could not fetch countries");
    const countries = await res.json();

    return countries;
  } catch (err) {
    console.log("error is", err);
    throw new Error(err.message);
  }
}

/////////////
// CREATE

export async function createBooking(formData) {
  const token = await getToken();

  const res = await fetch(`${URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) throw Error(data.message);

  const {
    data: { bookings },
  } = data;
  return bookings;
}

// export async function createGuest(newGuest) {
//   const { data, error } = await supabase.from("guests").insert([newGuest]);

//   if (error) {
//     console.error(error);
//     throw new Error("Guest could not be created");
//   }

//   return data;
// }

// export async function createBooking(newBooking) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .insert([newBooking])
//     // So that the newly created object gets returned!
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be created");
//   }

//   return data;
// }

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
// export async function updateGuest(id, updatedFields) {
//   const { data, error } = await supabase
//     .from("guests")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Guest could not be updated");
//   }
//   return data;
// }

// export async function updateBooking(id, updatedFields) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }
export async function updateBooking(formData, bookingId) {
  const token = await getToken();
  try {
    const res = await fetch(`${URL}/bookings/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    const {
      data: { booking },
    } = data;

    console.log("updated booking", booking);
    return booking;
  } catch (err) {
    throw new Error(err.message);
  }
}

/////////////
// DELETE

export async function deleteBooking(bookingId) {
  const token = await getToken();
  const res = await fetch(`${URL}/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Check if the response status is 204 (No Content)
  if (res.status !== 204) {
    const data = await res.json();
    throw new Error(data.message || "Booking could not be delete booking");
  }
}
