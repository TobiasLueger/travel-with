"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock, Users, Car, Train, Bus, ArrowRight } from 'lucide-react';
import { supabase, type Ride } from '@/lib/supabase';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export function RecentRides() {
  const router = useRouter();
  const [recentRides, setRecentRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentRides = async () => {
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('status', 'active')
        .gt('available_seats', 0)
        .gte('departure_date', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setRecentRides(data || []);
    } catch (error) {
      console.error('Error fetching recent rides:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'car':
        return <Car className="h-5 w-5" />;
      case 'train':
        return <Train className="h-5 w-5" />;
      case 'bus':
        return <Bus className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getTransportColor = (type: string) => {
    switch (type) {
      case 'car':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'train':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'bus':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  useEffect(() => {
    fetchRecentRides();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Rides
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Rides
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Fresh rides just posted by our community. Join these travelers on their upcoming journeys.
          </p>
        </div>

        {recentRides.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No recent rides
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Be the first to create a ride today!
              </p>
              <Button 
                onClick={() => router.push('/create-ride')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Create Ride
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRides.map((ride) => (
                <Card key={ride.id} className="hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${getTransportColor(ride.transport_type)}`}>
                        <div className="flex items-center">
                          {getTransportIcon(ride.transport_type)}
                          <span className="ml-1 capitalize">{ride.transport_type}</span>
                        </div>
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        by {ride.user_name}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        <span>{ride.from_location}</span>
                        <ArrowRight className="mx-2 h-4 w-4 text-gray-400" />
                        <span>{ride.to_location}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        {format(new Date(ride.departure_date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-2" />
                        {ride.departure_time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Users className="h-4 w-4 mr-2" />
                        {ride.available_seats} seats available
                      </div>
                    </div>

                    {ride.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {ride.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        FREE
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => router.push('/search')}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={() => router.push('/search')}
                variant="outline"
                className="hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600"
              >
                View All Rides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}