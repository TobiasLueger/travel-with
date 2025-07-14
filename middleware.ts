import createIntlMiddleware from 'next-intl/middleware';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/dashboard': '/dashboard',
    '/search': '/search',
    '/create-ride': '/create-ride',
    '/pricing': '/pricing',
    '/about': '/about',
    '/help': '/help',
    '/terms': '/terms',
    '/privacy': '/privacy',
    '/cookies': '/cookies'
  }
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