"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Car, Train, Bus, MapPin, Calendar, Clock, Users, Bell, Trash2, MoreVertical } from 'lucide-react';
import { supabase, type Ride, type RideJoin } from '@/lib/supabase';
import { format } from 'date-fns';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSubscription } from '@/hooks/use-subscription';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { subscription, isPremium, isTrialActive } = useSubscription();
  const [myRides, setMyRides] = useState<Ride[]>([]);
  const [joinRequests, setJoinRequests] = useState<RideJoin[]>([]);
  const [myJoinedRides, setMyJoinedRides] = useState<(RideJoin & { ride: Ride })[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rideToDelete, setRideToDelete] = useState<Ride | null>(null);
  const [deleting, setDeleting] = useState(false);

  if (isLoaded && !user) {
    redirect('/');
  }

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch my rides
      const { data: ridesData, error: ridesError } = await supabase
        .from('rides')
        .select('*')
        .eq('user_id', user.id)
        .order('departure_date', { ascending: true });

      if (ridesError) throw ridesError;
      setMyRides(ridesData || []);

      // Fetch join requests for my rides
      const { data: joinRequestsData, error: joinRequestsError } = await supabase
        .from('ride_joins')
        .select('*')
        .in('ride_id', ridesData?.map(r => r.id) || [])
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (joinRequestsError) throw joinRequestsError;
      setJoinRequests(joinRequestsData || []);

      // Fetch rides I've joined
      const { data: myJoinsData, error: myJoinsError } = await supabase
        .from('ride_joins')
        .select(`
          *,
          ride:rides(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (myJoinsError) throw myJoinsError;
      setMyJoinedRides(myJoinsData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRequest = async (joinId: string, action: 'accept' | 'reject') => {
    try {
      const { error } = await supabase
        .from('ride_joins')
        .update({ status: action === 'accept' ? 'accepted' : 'rejected' })
        .eq('id', joinId);

      if (error) throw error;
      
      toast.success(`Request ${action}ed successfully`);
      fetchDashboardData();
    } catch (error) {
      console.error('Error handling join request:', error);
      toast.error(`Failed to ${action} request`);
    }
  };

  const handleDeleteRide = async () => {
    if (!rideToDelete) return;

    setDeleting(true);
    try {
      // First check if the ride belongs to the current user
      if (rideToDelete.user_id !== user?.id) {
        throw new Error('Unauthorized: You can only delete your own rides');
      }

      const { error } = await supabase
        .from('rides')
        .delete()
        .eq('id', rideToDelete.id);

      if (error) throw error;
      
      // Immediately remove the ride from local state
      setMyRides(prevRides => prevRides.filter(ride => ride.id !== rideToDelete.id));
      
      // Also remove any related join requests from local state
      setJoinRequests(prevRequests => 
        prevRequests.filter(request => request.ride_id !== rideToDelete.id)
      );
      
      toast.success('Ride deleted successfully');
      setDeleteDialogOpen(false);
      setRideToDelete(null);
    } catch (error) {
      console.error('Error deleting ride:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete ride');
      // On error, refresh data to ensure consistency
      fetchDashboardData();
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteDialog = (ride: Ride) => {
    setRideToDelete(ride);
    setDeleteDialogOpen(true);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto mt-[5rem] px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.firstName || 'Traveler'}!
          </h1>
          {isPremium && (
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Premium
              </span>
              {isTrialActive && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Trial active until {subscription?.current_period_end ? 
                    new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}
                </span>
              )}
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-300">
            Manage your rides and connect with fellow travelers.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                My Rides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {myRides.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Active rides offered
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Join Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {joinRequests.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Pending requests
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Joined Rides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {myJoinedRides.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Rides I've joined
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href="/create-ride">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="mr-2 h-4 w-4" />
              Create New Ride
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Search Rides
            </Button>
          </Link>
        </div>

        {/* Join Requests */}
        {joinRequests.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Pending Join Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {joinRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {request.user_name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {request.message}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleJoinRequest(request.id, 'accept')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleJoinRequest(request.id, 'reject')}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* My Rides */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Rides</CardTitle>
          </CardHeader>
          <CardContent>
            {myRides.length === 0 ? (
              <div className="text-center py-8">
                <Car className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  You haven't created any rides yet.
                </p>
                <Link href="/create-ride">
                  <Button className="mt-4">Create Your First Ride</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myRides.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg group">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {getTransportIcon(ride.transport_type)}
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {ride.from_location} → {ride.to_location}
                        </span>
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
                          {ride.available_seats} seats
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(ride.status)}>
                        {ride.status}
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(ride)}
                            className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Ride
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Joined Rides */}
        <Card>
          <CardHeader>
            <CardTitle>Rides I've Joined</CardTitle>
          </CardHeader>
          <CardContent>
            {myJoinedRides.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  You haven't joined any rides yet.
                </p>
                <Link href="/search">
                  <Button className="mt-4">Browse Available Rides</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myJoinedRides.map((joinedRide) => (
                  <div key={joinedRide.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {getTransportIcon(joinedRide.ride.transport_type)}
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {joinedRide.ride.from_location} → {joinedRide.ride.to_location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(joinedRide.ride.departure_date), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {joinedRide.ride.departure_time}
                        </div>
                        <span className="text-sm">
                          Offered by {joinedRide.ride.user_name}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(joinedRide.status)}>
                      {joinedRide.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Ride</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this ride? This action cannot be undone.
            </AlertDialogDescription>
            {rideToDelete && (
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white">
                  {rideToDelete.from_location} → {rideToDelete.to_location}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {format(new Date(rideToDelete.departure_date), 'MMM d, yyyy')} at {rideToDelete.departure_time}
                </div>
              </div>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRide}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deleting ? 'Deleting...' : 'Delete Ride'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Footer />
    </div>
  );
}