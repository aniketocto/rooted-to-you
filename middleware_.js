import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  
  // List of protected routes (Add your payment page route here)
  const protectedRoutes = ["/payment"];
  
  if (protectedRoutes.includes(url.pathname)) {
    // Check if user is authenticated
    const authenticatedUser = req.cookies.get("authenticatedUser");
    const paymentSession = req.cookies.get("paymentSession");

    // Redirect if missing authentication/session
    if (!authenticatedUser || !paymentSession) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home
    }

    try {
      const sessionData = JSON.parse(paymentSession.value);
      if (!sessionData.sessionActive) {
        return NextResponse.redirect(new URL("/", req.url)); // Redirect if session inactive
      }
    } catch (error) {
      console.error("Invalid session data:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to matching routes
export const config = {
  matcher: ["/payment"], // Replace with the actual payment route
};
