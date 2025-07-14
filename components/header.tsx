"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { UserButton, SignInButton, useUser, useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const t = useTranslations('navigation');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('rides'), href: '/search' },
    { name: t('pricing'), href: '/pricing' },
    { name: t('about'), href: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex md:items-center md:space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Menu dots */}
          <div className="flex items-center space-x-4">

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme toggle - hidden on mobile to match design */}
            <div className="hidden lg:block">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 p-0"
                aria-label="Toggle theme"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>

            {/* Auth buttons - hidden to match clean design */}
            {isLoaded && (
              <>
                {user ? (
                  <div className="hidden lg:flex items-center space-x-3">
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm">
                        {t('dashboard')}
                      </Button>
                    </Link>
                    <UserButton 
                      afterSignOutUrl="/"
                      signInUrl="/sign-in"
                    />
                  </div>
                ) : (
                  <div className="hidden lg:block">
                    <SignInButton mode="modal">
                      <Button 
                        variant="default" 
                        size="sm"
                        className="bg-black hover:bg-gray-800 text-white"
                      >
                        {t('signIn')}
                      </Button>
                    </SignInButton>
                  </div>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 p-0"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200/20 dark:border-gray-800/20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isLoaded && (
                <>
                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 text-base font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('dashboard')}
                      </Link>
                      <button
                        onClick={() => signOut(() => window.location.assign('/'))}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 text-base font-medium text-left w-full"
                      >
                        {t('signOut')}
                      </button>
                    </>
                  ) : (
                    <div className="px-3 py-2">
                      <SignInButton mode="modal">
                        <Button variant="default" size="sm">
                          {t('signIn')}
                        </Button>
                      </SignInButton>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}