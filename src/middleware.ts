
// Without a defined matcher, this one line applies next-auth 
// to the entire project
// export { default } from "next-auth/middleware"

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/extra", "/dashboard"] }

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/auth/signin",
//   },
// });

import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith('/auth/signin') && isAuthenticated) {
    return NextResponse.redirect(new URL('/create/myokr', req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: '/auth/signin',
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}