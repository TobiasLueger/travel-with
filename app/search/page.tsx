"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock, Users, Car, Train, Bus, Search } from 'lucide-react';
import { supabase, type Ride } from '@/lib/supabase';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    date: searchParams.get('date') || '',
    transport: searchParams.get('transport') || 'any'
  });

  const searchRides = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('rides')
        .select('*')
        .eq('status', 'active')
        .gt('available_seats', 0)
        .order('departure_date', { ascending: true });

      if (searchForm.from) {
        query = query.ilike('from_location', `%${searchForm.from}%`);
      }
      if (searchForm.to) {
        query = query.ilike('to_location', `%${searchForm.to}%`);
      }
      if (searchForm.date) {
        query = query.eq('departure_date', searchForm.date);
      }
      if (searchForm.transport && searchForm.transport !== 'any') {
        query = query.eq('transport_type', searchForm.transport);
      }

      const { data, error } = await query;
      if (error) throw error;
      setRides(data || []);
    } catch (error) {
      console.error('Error searching rides:', error);
      toast.error('Failed to search rides');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRides();
  };

  const handleJoinRide = async (rideId: string) => {
    if (!user) {
      toast.error('Please sign in to join a ride');
      return;
    }

    try {
      const { error } = await supabase
        .from('ride_joins')
        .insert({
          ride_id: rideId,
          user_id: user.id,
          user_email: user.emailAddresses[0]?.emailAddress || '',
          user_name: user.fullName || 'Anonymous',
          status: 'pending',
          message: 'I would like to join this ride'
        });

      if (error) throw error;
      toast.success('Join request sent successfully!');
    } catch (error) {
      console.error('Error joining ride:', error);
      toast.error('Failed to send join request');
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
    searchRides();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Find Your Perfect Ride
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Search through thousands of available rides and find your travel companions.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Search Rides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="From"
                    value={searchForm.from}
                    onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="To"
                    value={searchForm.to}
                    onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={searchForm.date}
                    onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <select
                    value={searchForm.transport}
                    onChange={(e) => setSearchForm({ ...searchForm, transport: e.target.value })}
                    className="w-full h-10 pl-10 pr-4 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-md text-sm"
                  >
                    <option value="any">Any transport</option>
                    <option value="car">Car</option>
                    <option value="train">Train</option>
                    <option value="bus">Bus</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute left-3 top-3 h-5 w-5 text-gray-400">
                    {getTransportIcon(searchForm.transport)}
                  </div>
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Available Rides ({rides.length})
          </h2>
          
          {rides.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
               <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No rides found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search criteria or check back later for new rides.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {rides.map((ride) => (
                <Card key={ride.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Badge className={`mr-2 ${getTransportColor(ride.transport_type)}`}>
                            <div className="flex items-center">
                              {getTransportIcon(ride.transport_type)}
                              <span className="ml-1 capitalize">{ride.transport_type}</span>
                            </div>
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            by {ride.user_name}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          <span>{ride.from_location}</span>
                          <span className="mx-2">→</span>
                          <span>{ride.to_location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {format(new Date(ride.departure_date), 'MMM d, yyyy')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {ride.departure_time}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {ride.available_seats} seats available
                          </div>
                        </div>
                        
                        {ride.description && (
                          <p className="mt-2 text-gray-700 dark:text-gray-300">
                            {ride.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-4 lg:mt-0 lg:ml-6 flex items-center">
                        <div className="text-right mr-4">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            FREE
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            per person
                          </div>
                        </div>
                        <Button
                          onClick={() => handleJoinRide(ride.id)}
                          disabled={!user}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          {user ? 'Join Ride' : 'Sign In to Join'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}