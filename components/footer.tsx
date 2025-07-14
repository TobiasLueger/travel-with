"use client";

import Link from 'next/link';
import { MapPin, Mail, Heart, ArrowRight } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { name: 'Search Rides', href: '/search' },
    { name: 'Create Ride', href: '/create-ride' },
    { name: 'About', href: '/about' },
    { name: 'Help & Support', href: '/help' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Brand & Description */}
            <div className="space-y-8">
              <div>
                <Link href="/" className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    travel-with.de
                  </span>
                </Link>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
                  Connect with fellow travelers and share your journey. Find free rides by car, train, 
                  and other transport across Germany and Europe.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>Berlin, Germany</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>hello@travel-with.de</span>
                </div>
              </div>

              {/* Community Message */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Made with love for travelers
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Join our community of over 1 million travelers sharing rides and creating connections.
                </p>
              </div>
            </div>

            {/* Right Column - Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Quick Links
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="group flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Legal
                </h3>
                <ul className="space-y-4">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="group flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 dark:border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                © 2025 Travel-with.de. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>•</span>
                <span>Free community rides</span>
                <span>•</span>
                <span>Sustainable travel</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="text-gray-500 dark:text-gray-400">for the travel community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}