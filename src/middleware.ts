import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { currentUser } from "./services/AuthApi";


const AuthRoutes = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await currentUser();
  // console.log("user", user);
  

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login/?redirect_url=${pathname}`, request.url),
      );
    }
  }

  if (user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (user?.userRole !== "admin") {
      if (pathname.includes("dashboard/admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
      } else {
        return NextResponse.next();
      }
    }
    if(user?.userRole === "admin"){
      if (pathname.includes("dashboard/user")) {
        return NextResponse.redirect(new URL("/login", request.url));
      } else {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/Dashboard/admin/:page*",
    "/Dashboard/user/:page*"
  ],
};
