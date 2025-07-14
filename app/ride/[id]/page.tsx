"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect, useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  Train, 
  Bus, 
  Mail, 
  User,
  CheckCircle,
  XCircle,
  Clock3,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { supabase, type Ride, type RideJoin } from '@/lib/supabase';
import { format } from 'date-fns';
import Link from 'next/link';
import toast from 'react-hot-toast';
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

export default function RideDetailsPage() {
  const { user, isLoaded } = useUser();
  const params = useParams();
  const rideId = params.id as string;
  
  const [ride, setRide] = useState<Ride | null>(null);
  const [participants, setParticipants] = useState<RideJoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: 'accept' | 'reject' | null;
    participant: RideJoin | null;
  }>({ open: false, action: null, participant: null });

  if (isLoaded && !user) {
    redirect('/');
  }

  const fetchRideDetails = async () => {
    if (!user || !rideId) return;

    try {
      // Fetch ride details
      const { data: rideData, error: rideError } = await supabase
        .from('rides')
        .select('*')
        .eq('id', rideId)
        .single();

      if (rideError) throw rideError;

      // Check if the ride belongs to the current user
      if (rideData.user_id !== user.id) {
        toast.error('You can only view details of your own rides');
        redirect('/dashboard');
        return;
      }

      setRide(rideData);

      // Fetch all participants (join requests)
      const { data: participantsData, error: participantsError } = await supabase
        .from('ride_joins')
        .select('*')
        .eq('ride_id', rideId)
        .order('created_at', { ascending: false });

      if (participantsError) throw participantsError;
      setParticipants(participantsData || []);
    } catch (error) {
      console.error('Error fetching ride details:', error);
      toast.error('Failed to load ride details');
      redirect('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleParticipantAction = async (participantId: string, action: 'accept' | 'reject') => {
    setActionLoading(participantId);
    try {
      // If accepting, check if there are still seats available
      if (action === 'accept' && ride && ride.available_seats <= 0) {
        toast.error('No seats available for this ride');
        setActionLoading(null);
        return;
      }

      const { error } = await supabase
        .from('ride_joins')
        .update({ status: action === 'accept' ? 'accepted' : 'rejected' })
        .eq('id', participantId);

      if (error) throw error;
      
      // If we accepted a participant, decrease available seats
      if (action === 'accept' && ride) {
        // First get the current ride data
        const { data: currentRide, error: fetchError } = await supabase
          .from('rides')
          .select('available_seats')
          .eq('id', ride.id)
          .single();

        if (fetchError) {
          console.error('Error fetching ride data:', fetchError);
          // Revert the participant status if ride fetch failed
          await supabase
            .from('ride_joins')
            .update({ status: 'pending' })
            .eq('id', participantId);
          toast.error('Failed to update available seats');
          setActionLoading(null);
          return;
        }

        if (currentRide.available_seats <= 0) {
          // Revert the participant status if no seats available
          await supabase
            .from('ride_joins')
            .update({ status: 'pending' })
            .eq('id', participantId);
          toast.error('No seats available for this ride');
          setActionLoading(null);
          return;
        }

        // Update with the decremented value
        const { error: rideError } = await supabase
          .from('rides')
          .update({ 
            available_seats: currentRide.available_seats - 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', ride.id);

        if (rideError) {
          console.error('Error updating ride seats:', rideError);
          // Revert the participant status if seat update failed
          await supabase
            .from('ride_joins')
            .update({ status: 'pending' })
            .eq('id', participantId);
          toast.error('Failed to update available seats');
          setActionLoading(null);
          return;
        }
        
        // Update local ride state
        setRide(prev => prev ? { ...prev, available_seats: currentRide.available_seats - 1 } : null);
      }
      
      toast.success(`Participant ${action}ed successfully`);
      
      // Update local state
      setParticipants(prev => 
        prev.map(p => 
          p.id === participantId 
            ? { ...p, status: action === 'accept' ? 'accepted' : 'rejected' }
            : p
        )
      );
      
      setConfirmDialog({ open: false, action: null, participant: null });
    } catch (error) {
      console.error('Error handling participant action:', error);
      toast.error(`Failed to ${action} participant`);
    } finally {
      setActionLoading(null);
    }
  };

  const openConfirmDialog = (action: 'accept' | 'reject', participant: RideJoin) => {
    setConfirmDialog({ open: true, action, participant });
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'car':
        return <Car className="h-6 w-6" />;
      case 'train':
        return <Train className="h-6 w-6" />;
      case 'bus':
        return <Bus className="h-6 w-6" />;
      default:
        return <MapPin className="h-6 w-6" />;
    }
  };

  const getTransportColor = (type: string) => {
    switch (type) {
      case 'car':
        return 'from-blue-500 to-blue-600';
      case 'train':
        return 'from-green-500 to-green-600';
      case 'bus':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending':
        return <Clock3 className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock3 className="h-5 w-5 text-gray-600" />;
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const pendingCount = participants.filter(p => p.status === 'pending').length;
  const acceptedCount = participants.filter(p => p.status === 'accepted').length;
  const rejectedCount = participants.filter(p => p.status === 'rejected').length;

  useEffect(() => {
    if (user) {
      fetchRideDetails();
    }
  }, [user, rideId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="max-w-4xl mx-auto mt-[5rem] px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!ride) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto mt-[5rem] px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Ride Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Ride Details
              </CardTitle>
              <div className={`w-12 h-12 bg-gradient-to-br ${getTransportColor(ride.transport_type)} rounded-full flex items-center justify-center text-white`}>
                {getTransportIcon(ride.transport_type)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Route */}
            <div className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
              <MapPin className="h-6 w-6 mr-2 text-gray-500" />
              <span>{ride.from_location}</span>
              <span className="mx-4 text-gray-400">→</span>
              <span>{ride.to_location}</span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(ride.departure_date), 'EEEE, MMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {ride.departure_time}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Available Seats</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {ride.available_seats}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {ride.description && (
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  {ride.description}
                </p>
              </div>
            )}

            {/* Status */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <Badge className={getStatusColor(ride.status)}>
                {ride.status}
              </Badge>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created {format(new Date(ride.created_at), 'MMM d, yyyy')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Participants Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {pendingCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Pending Requests
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {acceptedCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Accepted
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {rejectedCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Rejected
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Participants ({participants.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {participants.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  No one has joined this ride yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                          {getInitials(participant.user_name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {participant.user_name}
                          </h3>
                          {getStatusIcon(participant.status)}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {participant.user_email}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Requested {format(new Date(participant.created_at), 'MMM d, yyyy')}
                          </div>
                        </div>
                        
                        {participant.message && (
                          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                            <div className="flex items-center mb-1">
                              <MessageSquare className="h-3 w-3 mr-1 text-gray-500" />
                              <span className="text-gray-500 dark:text-gray-400">Message:</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                              {participant.message}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(participant.status)}>
                        {participant.status}
                      </Badge>
                      
                      {participant.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => openConfirmDialog('accept', participant)}
                            disabled={actionLoading === participant.id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openConfirmDialog('reject', participant)}
                            disabled={actionLoading === participant.id}
                            className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.action === 'accept' ? 'Accept' : 'Reject'} Participant
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {confirmDialog.action} {confirmDialog.participant?.user_name}'s request to join this ride?
            </AlertDialogDescription>
            {confirmDialog.participant && (
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {confirmDialog.participant.user_name}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="h-3 w-3" />
                  <span>{confirmDialog.participant.user_email}</span>
                </div>
                {confirmDialog.participant.message && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Message: </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {confirmDialog.participant.message}
                    </span>
                  </div>
                )}
              </div>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading !== null}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmDialog.participant && confirmDialog.action && 
                handleParticipantAction(confirmDialog.participant.id, confirmDialog.action)}
              disabled={actionLoading !== null}
              className={confirmDialog.action === 'accept' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'}
            >
              {actionLoading === confirmDialog.participant?.id 
                ? `${confirmDialog.action === 'accept' ? 'Accepting' : 'Rejecting'}...` 
                : `${confirmDialog.action === 'accept' ? 'Accept' : 'Reject'} Participant`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}