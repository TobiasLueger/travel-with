"use client";

import Link from 'next/link';
import { MapPin, Mail, Heart, ArrowRight, Circle } from 'lucide-react';

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
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Main Footer Content */}
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Brand & Description */}
            <div className="space-y-10">
              <div>
                <Link href="/" className="flex items-center group mb-8">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Circle className="w-5 h-5 text-white dark:text-black fill-current" />
                  </div>
                  <span className="text-3xl font-bold text-black dark:text-white tracking-tight">
                    travel-with
                  </span>
                </Link>
                <p className="text-body-large text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                  Connect with fellow travelers and share your journey. Find free rides by car, train, 
                  and other transport across Germany.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-lg">Berlin, Germany</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-lg">hello@travel-with.de</span>
                </div>
              </div>

              {/* Community Message */}
              <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-3xl modern-card">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                  <span className="font-bold text-black dark:text-white text-lg">
                    Made with love for travelers
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Join our community of over 1 million travelers sharing rides and creating connections.
                </p>
              </div>
            </div>

            {/* Right Column - Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-8">
                  Quick Links
                </h3>
                <ul className="space-y-6">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300 text-lg"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="ml-3 h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-8">
                  Legal
                </h3>
                <ul className="space-y-6">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300 text-lg"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="ml-3 h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-8">
              <p className="text-gray-500 dark:text-gray-500">
                © 2025 Travel-with.de. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-3 text-gray-500 dark:text-gray-500">
                <span>•</span>
                <span>Free community rides</span>
                <span>•</span>
                <span>Sustainable travel</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-gray-500 dark:text-gray-500">Made with</span>
              <Heart className="h-5 w-5 text-red-500 animate-pulse" />
              <span className="text-gray-500 dark:text-gray-500">for the travel community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}