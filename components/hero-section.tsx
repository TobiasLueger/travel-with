"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Circle, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative bg-white dark:bg-black pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-50 dark:bg-gray-950 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-100 dark:bg-gray-900 rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto container-padding">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center justify-between min-h-screen section-padding">
          {/* Left Column - Text Content */}
          <div className="flex-1 max-w-3xl animate-fade-in-up">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 mb-8">
                <Circle className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Free Community Ridess
              </div>
            </div>
            
            <h1 className="text-hero gradient-text protectedb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Travel
              <br />
              <span className="italic font-light">Together</span>
            </h1>
            
            <p className="text-body-large text-gray-600 dark:text-gray-400 mb-12 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Connect with fellow travelers and share your journey.
              <br />
              Find free rides by car, train, and other transport across Germany.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button
                onClick={() => router.push('/search')}
                className="btn-modern group"
              >
                Find Your Ride
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button
                onClick={() => router.push('/create-ride')}
                className="btn-modern-outline"
              >
                Offer a Ride
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <div className="text-2xl font-bold text-black dark:text-white">1M+</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">Travelers</div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
              <div>
                <div className="text-2xl font-bold text-black dark:text-white">50K+</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">Rides Shared</div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
              <div>
                <div className="text-2xl font-bold text-black dark:text-white">100%</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">Free</div>
              </div>
            </div>
          </div>

          {/* Right Column - Colorful Location Pin */}
          <div className="flex-1 flex justify-center items-center animate-slide-in-right">
            <div className="relative w-full max-w-lg">
              {/* Modern Abstract Visualization */}
              <div className="relative w-96 h-96 mx-auto">
                {/* Main Circle */}
                <div className="absolute inset-0 bg-black dark:bg-white rounded-full shadow-2xl animate-pulse-subtle"></div>
                
                {/* Inner Elements */}
                <div className="absolute inset-8 bg-white dark:bg-black rounded-full flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-black dark:text-white" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-12 left-12 w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-16 left-16 w-2 h-2 bg-gray-500 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-8 right-16 w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                
                {/* Connection Lines */}
                <div className="absolute top-1/2 left-1/2 w-32 h-px bg-gray-200 dark:bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-px bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
              </div>
              
              {/* Decorative Text */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-sm text-gray-400 dark:text-gray-600 font-medium tracking-wide">
                  Connecting Travelers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}