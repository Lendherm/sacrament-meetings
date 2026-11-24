import type { NextAuthConfig } from "next-auth";

function isProtectedPath(pathname: string): boolean {
  if (pathname === "/meetings/new" || pathname.startsWith("/meetings/new/")) {
    return true;
  }
  // /meetings/[id]/edit
  return /^\/meetings\/[^/]+\/edit(?:\/|$)/.test(pathname);
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      if (isProtectedPath(pathname)) {
        return isLoggedIn;
      }

      if (isLoggedIn && pathname === "/login") {
        return Response.redirect(new URL("/meetings", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
