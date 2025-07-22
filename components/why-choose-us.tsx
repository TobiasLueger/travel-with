"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, Users, Leaf, Clock, Star, CheckCircle } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Completely Free',
      description: 'All rides are offered for free. Our community believes in helping each other travel.',
      color: 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safe & Secure',
      description: 'Verified users, secure messaging, and community-driven safety measures.',
      color: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Active Community',
      description: 'Join over 1 million travelers who share rides and create connections.',
      color: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Eco-Friendly',
      description: 'Reduce your carbon footprint by sharing rides and using group tickets.',
      color: 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Instant Booking',
      description: 'Find and join rides instantly. No waiting, no complicated booking process.',
      color: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Trusted Platform',
      description: 'Rated 4.8/5 by our community. Trusted by travelers across Germany.',
      color: 'bg-yellow-50 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400'
    }
  ];

  return (
    <section className="section-padding bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 mb-8">
            <CheckCircle className="w-4 h-4 mr-2" />
            Why Choose Us
          </div>
          <h2 className="text-display text-black dark:text-white mb-6">
            Why Choose Travel-with.de?
          </h2>
          <p className="text-body-large text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're more than just a ride-sharing platform. We're a community of travelers who care about each other and our planet.
          </p>
        </div>

        <div className="grid-cards mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="modern-card emotional-hover group text-center">
              <CardContent className="p-8">
                <div className={`w-20 h-20 ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-black dark:text-white mb-3">
              1M+
            </div>
            <div className="text-gray-500 dark:text-gray-500 font-medium">
              Active Users
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-black dark:text-white mb-3">
              50K+
            </div>
            <div className="text-gray-500 dark:text-gray-500 font-medium">
              Rides Shared
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-black dark:text-white mb-3">
              4.8★
            </div>
            <div className="text-gray-500 dark:text-gray-500 font-medium">
              User Rating
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-black dark:text-white mb-3">
              100%
            </div>
            <div className="text-gray-500 dark:text-gray-500 font-medium">
              Free Rides
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}