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
