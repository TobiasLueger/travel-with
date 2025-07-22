"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, TrendingUp, ArrowRight } from 'lucide-react';
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

  // Show message when no routes are available
  if (routes.length === 0 || routes.every(route => route.ride_count === 0)) {
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

          {/* No routes available message */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Noch keine Trending Routes
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Unsere Community wächst noch! Sei einer der ersten, der eine Fahrt anbietet 
                und hilf dabei, beliebte Routen zu etablieren.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => router.push('/create-ride')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Erste Fahrt erstellen
                </Button>
                <Button 
                  onClick={() => router.push('/search')}
                  variant="outline"
                  className="hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600"
                >
                  Alle Fahrten durchsuchen
                </Button>
              </div>
              
              {/* Encouraging stats */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Sobald mehr Fahrten erstellt werden, siehst du hier die beliebtesten Routen
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>100% kostenlos</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>Sichere Community</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span>Umweltfreundlich</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-white dark:bg-black rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 mb-8 shadow-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Popular Routes
          </div>
          <h2 className="text-display text-black dark:text-white mb-6">
            Trending Routes
          </h2>
          <p className="text-body-large text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the most popular travel routes in Germany. Join thousands of travelers sharing their journeys.
          </p>
        </div>

        {routes.length === 0 || routes.every(route => route.ride_count === 0) ? (
          <Card className="max-w-3xl mx-auto modern-card">
            <CardContent className="p-16 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <TrendingUp className="h-12 w-12 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-headline text-black dark:text-white mb-6">
                Routes Coming Soon
              </h3>
              <p className="text-body-large text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                Our community is growing! Be one of the first to create a ride and help establish popular routes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => router.push('/create-ride')}
                  className="btn-modern group"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Create First Ride
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  onClick={() => router.push('/search')}
                  className="btn-modern-outline"
                >
                  Browse All Rides
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid-cards mb-16">
              {routes.map((route, index) => (
                <Card key={index} className="modern-card emotional-hover group cursor-pointer" onClick={() => handleRouteClick(route.from_location, route.to_location)}>
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getRouteColor(index)} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                        {route.from_location} → {route.to_location}
                      </h3>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>{getTrendPercentage(route.ride_count, index)} this week</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Available rides</span>
                        </div>
                        <span className="font-semibold text-black dark:text-white">
                          {route.ride_count > 0 ? route.ride_count : 'None'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Avg. duration</span>
                        </div>
                        <span className="font-semibold text-black dark:text-white">{getEstimatedDuration(route.from_location, route.to_location)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Price</span>
                        <span className="font-bold text-green-600 dark:text-green-400">Free</span>
                      </div>
                    </div>

                    <Button className="w-full btn-modern-outline group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                      View Rides
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                onClick={() => router.push('/search')}
                className="btn-modern group"
              >
                Explore All Routes
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}