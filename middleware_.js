import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("Middleware is running...");

  const url = req.nextUrl.clone();
  const isClient = typeof window !== "undefined";

  // Simulate checking user authentication (in reality, use cookies or session)
  const isLoggedIn = req.cookies.get("userAuth") === "true";
  const isCheckingOut = req.cookies.get("checkoutStatus") === "true";

  // 🚫 Restrict access to "/order", "/profile", and "/payment"
  if (
    !isLoggedIn &&
    ["/order", "/profile", "/payment"].includes(url.pathname)
  ) {
    url.pathname = "/register"; // Redirect if not logged in
    return NextResponse.redirect(url);
  }

  // 🚫 Restrict access to "/payment" unless checkout is in progress
  if (url.pathname === "/payment" && !isCheckingOut) {
    url.pathname = "/order"; // Redirect back to cart if checkout isn't started
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Define protected routes
export const config = {
  matcher: ["/order/:path*", "/payment", "/profile"],
};
