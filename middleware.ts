import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/dashboard", "/jobs"];
export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  return NextResponse.next();
}

// middleware.ts

// import { auth as middleware } from "./auth";

// export default middleware;

// export const config = {
//   matcher: ["/dashboard/:path*", "/jobs/post/:path*"], // only these pages require auth
// };

// export const config = {
//   matcher: [
//     "/jobs/post/:path*",
//     "/jobs/post",
//     "/jobs/:path*",
//     "/dashboard",
//     "/dashboard/:path*",
//   ], // only protect these routes
// };

// import { auth } from "./auth";

// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("/login", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });
// export const config = {
//   matcher: ["/jobs/post/:path*", "/dashboard", "/dashboard/:path*"], // only these routes require auth
// };
// import { auth } from "./auth";

// export default auth((req) => {
//   console.log("hello");
//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("/login", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });
