import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-ride(.*)',
  '/my-rides(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // If the route is protected, require authentication
  if (isProtectedRoute(req)) {
    return auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};