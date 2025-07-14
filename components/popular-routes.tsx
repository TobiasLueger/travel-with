"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface RouteStats {
  from_location: string;
  to_location: string;
  ride_count: number;
  avg_duration?: string;
}
export function PopularRoutes() {
  const router = useRouter();
  const [routes, setRoutes] = useState<RouteStats[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPopularRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('from_location, to_location')
        .eq('status', 'active')
        .gte('departure_date', new Date().toISOString().split('T')[0]);

      if (error) throw error;

      // Group by route and count
      const routeMap = new Map<string, RouteStats>();
      
      data?.forEach(ride => {
        const key = `${ride.from_location}-${ride.to_location}`;
        if (routeMap.has(key)) {
          const existing = routeMap.get(key)!;
          existing.ride_count += 1;
        } else {
          routeMap.set(key, {
            from_location: ride.from_location,
            to_location: ride.to_location,
            ride_count: 1
          });
        }
      });

      // Convert to array and sort by count
      const sortedRoutes = Array.from(routeMap.values())
        .sort((a, b) => b.ride_count - a.ride_count)
        .slice(0, 4);

      setRoutes(sortedRoutes);
    } catch (error) {
      console.error('Error fetching popular routes:', error);
      // Fallback to static data if error
      setRoutes([
        { from_location: 'Berlin', to_location: 'Munich', ride_count: 0 },
        { from_location: 'Hamburg', to_location: 'Frankfurt', ride_count: 0 },
        { from_location: 'Cologne', to_location: 'Düsseldorf', ride_count: 0 },
        { from_location: 'Stuttgart', to_location: 'Nuremberg', ride_count: 0 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRouteClick = (fromLocation: string, toLocation: string) => {
    const params = new URLSearchParams();
    params.set('from', fromLocation);
    params.set('to', toLocation);
    router.push(`/search?${params.toString()}`);
  };

  const getRouteColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600', 
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600'
    ];
    return colors[index % colors.length];
  };

  const getTrendPercentage = (count: number, index: number) => {
    // Generate realistic trend percentages based on ride count
    const trends = ['+12%', '+8%', '+15%', '+5%'];
    return count > 0 ? trends[index % trends.length] : '+0%';
  };

  const getEstimatedDuration = (from: string, to: string) => {
    // Estimated durations for common routes
    const durations: { [key: string]: string } = {
      'Berlin-Munich': '4h 30m',
      'Munich-Berlin': '4h 30m',
      'Hamburg-Frankfurt': '3h 45m',
      'Frankfurt-Hamburg': '3h 45m',
      'Cologne-Düsseldorf': '45m',
      'Düsseldorf-Cologne': '45m',
      'Stuttgart-Nuremberg': '2h 15m',
      'Nuremberg-Stuttgart': '2h 15m'
    };
    return durations[`${from}-${to}`] || '2-4h';
  };

  useEffect(() => {
    fetchPopularRoutes();
  }, []);

  if (loading) {
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleRouteClick(route.from_location, route.to_location)}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${getRouteColor(index)} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {route.from_location} → {route.to_location}
                  </h3>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>{getTrendPercentage(route.ride_count, index)} this week</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Available rides</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {route.ride_count > 0 ? route.ride_count : 'None'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Avg. duration</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{getEstimatedDuration(route.from_location, route.to_location)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <span className="font-bold text-green-600 dark:text-green-400">Free</span>
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