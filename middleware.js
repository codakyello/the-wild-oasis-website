import { NextResponse } from "next/server";
import { auth } from "@/app/_lib/auth"; // Adjust the import based on your auth method
import { authorize } from "./app/_lib/data-service";

export async function middleware(request) {
  const session = await auth();
  const token = session?.token;
  console.log(session);
  const isAuthorised = await authorize(token);
  console.log("User is authorised", isAuthorised);

  const isLoginPage = request.nextUrl.pathname === "/login";
  const isSignUpPage = request.nextUrl.pathname === "/signup";
  const isAccountPage = request.nextUrl.pathname === "/account";

  // If the user is authenticated and trying to access the /account page, allow access
  if (isAuthorised && isAccountPage) {
    return NextResponse.next();
  }

  // If the user is authenticated and trying to access the /login page, redirect to /account
  if (isAuthorised && (isLoginPage || isSignUpPage)) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  // If the user is authenticated but trying to access any other page, redirect to /account
  if (isAuthorised) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  // If there is no session and the user is trying to access the /account page, redirect to /login
  if (!isAuthorised && isAccountPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to the /login page if the user is not authenticated
  if (!isAuthorised && (isLoginPage || isSignUpPage)) {
    return NextResponse.next();
  }
}

// Export config for the middleware
export const config = {
  matcher: ["/account", "/login", "/signup"], // Apply middleware to relevant routes
};
