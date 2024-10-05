import { auth } from "../_lib/auth";

export const buildQueryString = (params) => {
  console.log("This are the params", params);
  const query = new URLSearchParams();

  // Loop through the parameters and append to the query string
  for (const key in params) {
    console.log(params[key]);
    query.append(key, params[key]);
  }
  return query.toString(); // Convert to query string
};

export async function getToken() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  return session.token;
}
