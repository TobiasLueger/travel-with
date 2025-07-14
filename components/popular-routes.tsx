"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function PopularRoutes() {
  const router = useRouter();

  const routes = [
    {
      from: 'Berlin',
      to: 'Munich',
      rides: 45,
      avgPrice: 'Free',
      duration: '4h 30m',
      trend: '+12%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      from: 'Hamburg',
      to: 'Frankfurt',
      rides: 32,
      avgPrice: 'Free',
      duration: '3h 45m',
      trend: '+8%',
      color: 'from-green-500 to-green-600'
    },
    {
      from: 'Cologne',
      to: 'Düsseldorf',
      rides: 28,
      avgPrice: 'Free',
      duration: '45m',
      trend: '+15%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      from: 'Stuttgart',
      to: 'Nuremberg',
      rides: 21,
      avgPrice: 'Free',
      duration: '2h 15m',
      trend: '+5%',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const handleRouteClick = (from: string, to: string) => {
    const params = new URLSearchParams();
    params.set('from', from);
    params.set('to', to);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Trending Routes
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the most popular travel routes in Germany. Join thousands of travelers sharing their journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleRouteClick(route.from, route.to)}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${route.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {route.from} → {route.to}
                  </h3>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>{route.trend} this week</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Available rides</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{route.rides}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Avg. duration</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{route.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{route.avgPrice}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:border-purple-300 dark:group-hover:border-purple-600">
                  View Rides
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={() => router.push('/search')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Explore All Routes
          </Button>
        </div>
      </div>
    </section>
  );
}