import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface CustomAuth {
  userId: string | null;
  // Add any other properties based on the actual structure of the auth object
}

// Custom function to handle redirection after authentication
const handleAuthRedirection = (auth: CustomAuth, req: any) => {
  const { pathname } = req.nextUrl;

  // Always allow access to the root page
  if (pathname === '/') {
    return null;
  }

  // Check if the user is logged in
  if (auth.userId) {
    // Redirect logged-in users from /admin to /dashboard
    if (pathname.startsWith('/admin')) {
      const redirectPrivateRoute = new URL('/dashboard', req.url);
      return NextResponse.redirect(redirectPrivateRoute);
    }

    // Allow access to other routes starting with /dashboard
    if (pathname.startsWith('/dashboard')) {
      return null;
    }
  } else if (pathname.startsWith('/dashboard')) {
    // Redirect non-logged-in users from /dashboard to /admin
    const redirectPublicRoute = new URL('/admin', req.url);
    return NextResponse.redirect(redirectPublicRoute);
  }

  // If none of the above conditions match, allow the request to proceed
  return null;
};

// Middleware configuration
const authMiddlewareConfig = {
  publicRoutes: ['/'],
  afterAuth: handleAuthRedirection,
};

// Export the enhanced authMiddleware
export default authMiddleware(authMiddlewareConfig);

// Additional configuration if needed
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
