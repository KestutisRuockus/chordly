import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes are public (don't require login)
const isPublicRoute = createRouteMatcher([
  "/",
  "/find-teachers(.*)",
  "/for-students",
  "/for-teachers",
  "/pricing",
  "/faq",
  "/about",
  "/design-system",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/uploadthing(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  if (isPublicRoute(request)) {
    return;
  }

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
