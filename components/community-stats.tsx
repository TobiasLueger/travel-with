"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Heart, Leaf, TrendingUp, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CommunityStats() {
  const router = useRouter();

  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: '1,000,000+',
      label: 'Active Travelers',
      description: 'Join our growing community',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      value: '50,000+',
      label: 'Rides Shared',
      description: 'Successful journeys completed',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      value: '100%',
      label: 'Free Rides',
      description: 'Community-driven sharing',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      value: '2,500 tons',
      label: 'CO₂ Saved',
      description: 'Environmental impact',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const achievements = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Growing Fast',
      description: '+25% new users this month'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Nationwide Coverage',
      description: 'Available in all German cities'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Trusted Community',
      description: '4.8/5 average user rating'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Community Impact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Together, we're building a more connected and sustainable way to travel. See how our community is making a difference.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {achievement.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Start your journey today. Find rides, meet new people, and help build a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push('/search')}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Find a Ride
              </Button>
              <Button 
                onClick={() => router.push('/create-ride')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                Offer a Ride
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-4 py-2 rounded-full">
            <Leaf className="h-5 w-5" />
            <span className="font-medium">
              Every shared ride helps reduce traffic and emissions
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}