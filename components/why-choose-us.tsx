"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, Users, Leaf, Clock, Star } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Completely Free',
      description: 'All rides are offered for free. Our community believes in helping each other travel.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safe & Secure',
      description: 'Verified users, secure messaging, and community-driven safety measures.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Active Community',
      description: 'Join over 1 million travelers who share rides and create connections.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Eco-Friendly',
      description: 'Reduce your carbon footprint by sharing rides and using group tickets.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Instant Booking',
      description: 'Find and join rides instantly. No waiting, no complicated booking process.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Trusted Platform',
      description: 'Rated 4.8/5 by our community. Trusted by travelers across Germany.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Travel-with.de?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're more than just a ride-sharing platform. We're a community of travelers who care about each other and our planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              1M+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Active Users
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              50K+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Rides Shared
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              4.8★
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              User Rating
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Free Rides
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}