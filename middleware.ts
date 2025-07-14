import createMiddleware from 'next-intl/middleware';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

const isProtectedRoute = createRouteMatcher([
  '/(de|en)/dashboard(.*)',
  '/dashboard(.*)',
  '/(de|en)/create-ride(.*)',
  '/create-ride(.*)',
  '/(de|en)/my-rides(.*)',
  '/my-rides(.*)',
]);

export default clerkMiddleware((auth, req: NextRequest) => {
  // If the route is protected, require authentication
  if (isProtectedRoute(req)) {
    auth.protect();
  }
  
  // Apply internationalization
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};