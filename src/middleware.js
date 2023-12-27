import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

const protectedRoutes = ["/movies"];
// eslint-disable-next-line
export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      // if (req.nextUrl.pathname.startsWith("/dashboard") && token === null) {
      //   return false;
      // }
      if (
        protectedRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route)
        ) &&
        token === null
      ) {
        return false;
      }
      return true;
    },
  },
});
