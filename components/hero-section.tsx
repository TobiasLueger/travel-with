"use client";

import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-between min-h-screen py-20">
          {/* Left Column - Text Content */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
              Meet Your New
              <br />
              Transport App
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-md leading-relaxed">
              Caring for people during they are outside,
              <br />
              on bike, in subway or car.
            </p>
            
            <Button
              onClick={() => router.push('/search')}
              className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              FIND YOUR RIDE NOW
              <Car className="ml-3 h-5 w-5" />
            </Button>
          </div>

          {/* Right Column - Colorful Location Pin */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              {/* Main location pin shape */}
              <div className="w-80 h-96 relative">
                {/* Pin body - gradient sections */}
                <div className="absolute inset-0 rounded-t-full rounded-b-lg overflow-hidden shadow-2xl">
                  {/* Top section - purple/blue */}
                  <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                  
                  {/* Right section - pink/red */}
                  <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-b from-pink-500 to-red-500"></div>
                  
                  {/* Left section - purple */}
                  <div className="absolute top-1/4 left-0 w-1/2 h-1/4 bg-purple-500"></div>
                  
                  {/* Bottom left - yellow */}
                  <div className="absolute bottom-1/4 left-0 w-1/2 h-1/4 bg-yellow-400"></div>
                  
                  {/* Bottom right - orange */}
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/4 bg-orange-500"></div>
                  
                  {/* Bottom center - yellow continuation */}
                  <div className="absolute bottom-0 left-1/4 w-1/2 h-1/4 bg-yellow-400"></div>
                </div>
                
                {/* White center circle */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-lg"></div>
                
                {/* Pin point at bottom */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-yellow-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}