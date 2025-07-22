"use client";

import { useState, useEffect, Suspense } from 'react';
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

  // State to track user's join requests
  const [userJoinRequests, setUserJoinRequests] = useState<{[rideId: string]: string}>({});

  // Fetch user's existing join requests
  const fetchUserJoinRequests = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ride_joins')
        .select('ride_id, status')
        .eq('user_id', user.id)
        .in('status', ['pending', 'accepted']);

      if (error) throw error;

      const requestsMap: {[rideId: string]: string} = {};
      data?.forEach(request => {
        requestsMap[request.ride_id] = request.status;
      });
      setUserJoinRequests(requestsMap);
    } catch (error) {
      console.error('Error fetching user join requests:', error);
    }
  };

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
      
      // Fetch user's join requests after loading rides
      if (user) {
        await fetchUserJoinRequests();
      }
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

    // Check if this is the user's own ride
    const ride = rides.find(r => r.id === rideId);
    if (ride && ride.user_id === user.id) {
      toast.error('You cannot join your own ride');
      return;
    }

    // Check if ride has available seats
    if (ride && ride.available_seats <= 0) {
      toast.error('This ride is full - no seats available');
      return;
    }
    // Check if user already has a pending or accepted request
    const existingStatus = userJoinRequests[rideId];
    if (existingStatus === 'pending') {
      toast.error('You already have a pending request for this ride');
      return;
    } else if (existingStatus === 'accepted') {
      toast.error('You have already joined this ride');
      return;
    }

    try {
      const { error } = await supabase
        .from('ride_joins')
        .insert({
          ride_id: rideId,
          user_id: user.id,
          user_email: user.emailAddresses[0]?.emailAddress || '',
          user_name: user.username || user.fullName || 'Anonymous',
          status: 'pending',
          message: 'I would like to join this ride'
        });

      if (error) {
        console.error('Error creating join request:', error);
        throw error;
      }
      
      // Update local state to reflect the new pending request
      setUserJoinRequests(prev => ({
        ...prev,
        [rideId]: 'pending'
      }));
      
      toast.success('Join request sent successfully!');
    } catch (error) {
      console.error('Error joining ride:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send join request');
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

  // Function to get button text and state based on ride and user status
  const getJoinButtonState = (ride: Ride) => {
    if (!user) {
      return { text: 'Sign In to Join', disabled: true };
    }
    
    if (ride.user_id === user.id) {
      return { text: 'Your Ride', disabled: true };
    }
    
    if (ride.available_seats <= 0) {
      return { text: 'Ride Full', disabled: true };
    }
    
    const joinStatus = userJoinRequests[ride.id];
    if (joinStatus === 'pending') {
      return { text: 'Request Pending', disabled: true };
    } else if (joinStatus === 'accepted') {
      return { text: 'Already Joined', disabled: true };
    }
    
    return { text: 'Join Ride', disabled: false };
  };

  useEffect(() => {
    searchRides();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserJoinRequests();
    }
  }, [user]);

  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="max-w-7xl mx-auto mt-[5rem] container-padding section-padding">
          <div className="mb-12">
            <h1 className="text-display text-black dark:text-white mb-4">
              Find Your Perfect Ride
            </h1>
            <p className="text-body-large text-gray-600 dark:text-gray-400">
              Search through thousands of available rides and find your travel companions.
            </p>
          </div>
  
          {/* Search Form */}
          <Card className="modern-card mb-12">
            <CardHeader>
              <CardTitle className="flex items-center text-black dark:text-white">
                <Search className="mr-2 h-5 w-5" />
                Search Rides
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="From"
                      value={searchForm.from}
                      onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
                      className="modern-input pl-12"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="To"
                      value={searchForm.to}
                      onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
                      className="modern-input pl-12"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      type="date"
                      value={searchForm.date}
                      onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                      className="modern-input pl-12"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={searchForm.transport}
                      onChange={(e) => setSearchForm({ ...searchForm, transport: e.target.value })}
                      className="modern-input pl-12 appearance-none"
                    >
                      <option value="any">Any transport</option>
                      <option value="car">Car</option>
                      <option value="train">Train</option>
                      <option value="bus">Bus</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute left-4 top-4 h-5 w-5 text-gray-400">
                      {getTransportIcon(searchForm.transport)}
                    </div>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="btn-modern">
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </form>
            </CardContent>
          </Card>
  
          {/* Results */}
          <div className="space-y-8">
            <h2 className="text-headline text-black dark:text-white">
              Available Rides ({rides.length})
            </h2>
            
            {rides.length === 0 ? (
              <Card className="modern-card">
                <CardContent className="p-16 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Search className="h-12 w-12 text-gray-400 dark:text-gray-600" />
                  </div>
                  <h3 className="text-headline text-black dark:text-white mb-4">
                    No rides found
                  </h3>
                  <p className="text-body-large text-gray-600 dark:text-gray-400">
                    Try adjusting your search criteria or check back later for new rides.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {rides.map((ride) => (
                  <Card key={ride.id} className="modern-card emotional-hover">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <div className={`mr-3 px-3 py-1 rounded-full text-xs font-medium ${getTransportColor(ride.transport_type)}`}>
                              <div className="flex items-center">
                                {getTransportIcon(ride.transport_type)}
                                <span className="ml-2 capitalize">{ride.transport_type}</span>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-500">
                              by {ride.user_name}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-xl font-bold text-black dark:text-white mb-4">
                            <span>{ride.from_location}</span>
                            <span className="mx-4 text-gray-400 dark:text-gray-600">→</span>
                            <span>{ride.to_location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {format(new Date(ride.departure_date), 'MMM d, yyyy')}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {ride.departure_time}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              {ride.available_seats} seats available
                            </div>
                          </div>
                          
                          {ride.description && (
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {ride.description}
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-6 lg:mt-0 lg:ml-8 flex items-center">
                          <div className="text-right mr-6">
                            <div className="text-3xl font-black text-green-600 dark:text-green-400">
                              FREE
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-500">
                              per person
                            </div>
                          </div>
                          {(() => {
                            const buttonState = getJoinButtonState(ride);
                            return (
                              <Button
                                onClick={() => !buttonState.disabled && handleJoinRide(ride.id)}
                                disabled={buttonState.disabled}
                                className={buttonState.disabled ? "btn-modern-outline opacity-50 cursor-not-allowed" : "btn-modern"}
                              >
                                {buttonState.text}
                              </Button>
                            );
                          })()}
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
    </Suspense>
  );
}