"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Student',
      content: 'This is simple and easy to use. I can find rides quickly and the community is amazing.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Michael Weber', 
      role: 'Business Traveler',
      content: 'Great way to share Deutsche Bahn group tickets. Saved money and met interesting people.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Anna Rodriguez',
      role: 'Frequent Traveler', 
      content: 'Mike E. said: "This is simple and easy to use. I can find rides quickly and the community is amazing."',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left side content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 block">
                Our customers
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                About 1 million
                <br />
                users of our app
              </h2>
            </div>

            {/* User avatars */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <div className="relative -ml-2">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
              </div>
              <div className="relative -ml-2">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>
          </div>

          {/* Right side - Testimonial */}
          <div>
            <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 rounded-3xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="relative mb-8">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gray-200 dark:text-gray-700" />
                  <p className="text-gray-700 dark:text-gray-300 relative z-10 leading-relaxed text-lg">
                    "This is simple and easy to use. I can find rides quickly and the community is amazing."
                  </p>
                </div>
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
                    alt="Mike E."
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">
                      Mike E.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Verified User
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom illustration */}
        <div className="mt-20">
          <div className="relative h-64 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 rounded-3xl overflow-hidden">
            {/* Map-like background with lines */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-yellow-400/30"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-400/30"></div>
              <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-yellow-400/30"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-yellow-400/30"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-400/30"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-yellow-400/30"></div>
            </div>
            
            {/* Characters */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-4xl mx-auto px-8">
                {/* Central circle */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"></div>
                
                {/* Character illustrations */}
                <div className="absolute left-1/4 top-1/3 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                <div className="absolute right-1/4 top-1/4 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full"></div>
                <div className="absolute left-1/3 bottom-1/4 w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full"></div>
                <div className="absolute right-1/3 bottom-1/3 w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}