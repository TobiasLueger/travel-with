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
    <section className="section-padding bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-900 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 mb-8">
            <Clock className="w-4 h-4 mr-2" />
            Latest Activity
          </div>
          <h2 className="text-display text-black dark:text-white mb-6">
            Latest Rides
          </h2>
          <p className="text-body-large text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Fresh rides just posted by our community. Join these travelers on their upcoming journeys.
          </p>
        </div>

        {recentRides.length === 0 ? (
          <Card className="max-w-2xl mx-auto modern-card">
            <CardContent className="p-16 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <MapPin className="h-12 w-12 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-headline text-black dark:text-white mb-6">
                No recent rides
              </h3>
              <p className="text-body-large text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Be the first to create a ride today!
              </p>
              <Button 
                onClick={() => router.push('/create-ride')}
                className="btn-modern group"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Create Ride
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid-cards mb-16">
              {recentRides.map((ride) => (
                <Card key={ride.id} className="modern-card emotional-hover group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTransportColor(ride.transport_type)}`}>
                        <div className="flex items-center">
                          <span className="mr-1">{getTransportIcon(ride.transport_type)}</span>
                          <span className="capitalize">{ride.transport_type}</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        by {ride.user_name}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="mb-6">
                      <div className="flex items-center text-lg font-bold text-black dark:text-white mb-3">
                        <span>{ride.from_location}</span>
                        <ArrowRight className="mx-3 h-4 w-4 text-gray-400 dark:text-gray-600" />
                        <span>{ride.to_location}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-3" />
                        {format(new Date(ride.departure_date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-3" />
                        {ride.departure_time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-3" />
                        {ride.available_seats > 0 ? `${ride.available_seats} seats available` : 'Ride full'}
                      </div>
                    </div>

                    {ride.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                        {ride.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-xl font-black text-green-600 dark:text-green-400">
                        FREE
                      </div>
                      <Button 
                        onClick={() => router.push('/search')}
                        disabled={ride.available_seats <= 0}
                        className={ride.available_seats <= 0 ? "btn-modern-outline opacity-50 cursor-not-allowed" : "btn-modern text-sm px-4 py-2"}
                      >
                        {ride.available_seats > 0 ? 'View Details' : 'Ride Full'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                onClick={() => router.push('/search')}
                className="btn-modern-outline group"
              >
                View All Rides
                <ArrowRight className="ml-2 h-4 w-4" />
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}