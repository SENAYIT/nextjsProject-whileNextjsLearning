// for the next auth security random generated string, you can use https://generate-secret.vercel.app/32
// for the login page - authenthication configuration

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // You can use the pages option to specify the route for custom sign-in, sign-out, and error pages.
  //  This is not required, but by adding signIn: '/login' into our pages option, the user will be redirected to our custom login page, rather than the NextAuth.js default page.
  pages: {
    signIn: "/login",
  },
  // The callbacks option allows you to define functions that will be called at specific points in the authentication flow. In this case, we are using the authorized callback to check if the user is logged in and redirect them accordingly.
  //   Next, add the logic to protect your routes.
  // This will prevent users from accessing the dashboard pages unless they are logged in.
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
