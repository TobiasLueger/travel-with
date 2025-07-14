"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect, useRouter, useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Edit, MapPin, Calendar, Clock, Users, Car, Train, Bus } from 'lucide-react';
import { supabase, type Ride } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function EditRidePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const params = useParams();
  const rideId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [ride, setRide] = useState<Ride | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    from_location: '',
    to_location: '',
    departure_date: '',
    departure_time: '',
    available_seats: '1',
    transport_type: 'car',
    price_per_person: '0'
  });

  if (isLoaded && !user) {
    redirect('/');
  }

  useEffect(() => {
    const fetchRide = async () => {
      if (!user || !rideId) return;

      try {
        const { data, error } = await supabase
          .from('rides')
          .select('*')
          .eq('id', rideId)
          .single();

        if (error) throw error;

        // Check if the ride belongs to the current user
        if (data.user_id !== user.id) {
          toast.error('You can only edit your own rides');
          router.push('/dashboard');
          return;
        }

        setRide(data);
        setFormData({
          title: data.title,
          description: data.description || '',
          from_location: data.from_location,
          to_location: data.to_location,
          departure_date: data.departure_date,
          departure_time: data.departure_time,
          available_seats: data.available_seats.toString(),
          transport_type: data.transport_type,
          price_per_person: data.price_per_person.toString()
        });
      } catch (error) {
        console.error('Error fetching ride:', error);
        toast.error('Failed to load ride');
        router.push('/dashboard');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchRide();
  }, [user, rideId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !ride) return;

    setLoading(true);
    try {
      console.log('🔄 Starting ride update process...');
      console.log('User ID:', user.id);
      console.log('Ride ID:', ride.id);
      console.log('Ride owner ID:', ride.user_id);
      console.log('Form data:', formData);
      
      // Verify user owns the ride
      if (ride.user_id !== user.id) {
        throw new Error('Unauthorized: You can only edit your own rides');
      }
      
      // First, let's check if we can read the current ride
      const { data: currentRide, error: readError } = await supabase
        .from('rides')
        .select('*')
        .eq('id', ride.id)
        .single();
        
      if (readError) {
        console.error('❌ Error reading current ride:', readError);
        throw new Error(`Cannot read ride: ${readError.message}`);
      }
      
      console.log('✅ Current ride data:', currentRide);
      
      // Prepare update data
      const updateData = {
        title: formData.title,
        description: formData.description,
        from_location: formData.from_location,
        to_location: formData.to_location,
        departure_date: formData.departure_date,
        departure_time: formData.departure_time,
        available_seats: parseInt(formData.available_seats),
        transport_type: formData.transport_type,
        price_per_person: parseFloat(formData.price_per_person),
        updated_at: new Date().toISOString()
      };
      
      console.log('📝 Update data:', updateData);
      
      // Perform the update
      const { data: updatedData, error } = await supabase
        .from('rides')
        .update(updateData)
        .eq('id', ride.id)
        .select(); // This will return the updated row
        
      console.log('📊 Supabase response:', { data: updatedData, error });
      
      if (error) {
        console.error('❌ Supabase update error:', error);
        throw error;
      }
      
      if (!updatedData || updatedData.length === 0) {
        console.error('❌ No rows were updated');
        throw new Error('No rows were updated. This might be a permissions issue.');
      }
      
      console.log('✅ Update successful! Updated data:', updatedData[0]);
      
      // Verify the update by reading the ride again
      const { data: verifyData, error: verifyError } = await supabase
        .from('rides')
        .select('*')
        .eq('id', ride.id)
        .single();
        
      if (verifyError) {
        console.error('❌ Error verifying update:', verifyError);
      } else {
        console.log('🔍 Verified updated ride:', verifyData);
      }
      
      toast.success('Ride updated successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('❌ Error updating ride:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update ride');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="max-w-3xl mx-auto mt-[5rem] px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
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
      <main className="max-w-3xl mx-auto mt-[5rem] px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Edit Ride
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Update your ride details and let travelers know about any changes.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Edit className="mr-2 h-5 w-5" />
              Ride Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Ride Title</Label>
                  <Input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., Berlin to Munich"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="transport_type">Transport Type</Label>
                  <select
                    id="transport_type"
                    value={formData.transport_type}
                    onChange={(e) => handleChange('transport_type', e.target.value)}
                    className="w-full h-10 px-3 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-md text-sm"
                    required
                  >
                    <option value="car">Car</option>
                    <option value="train">Train</option>
                    <option value="bus">Bus</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="from_location">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="from_location"
                      type="text"
                      value={formData.from_location}
                      onChange={(e) => handleChange('from_location', e.target.value)}
                      placeholder="Departure location"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="to_location">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="to_location"
                      type="text"
                      value={formData.to_location}
                      onChange={(e) => handleChange('to_location', e.target.value)}
                      placeholder="Destination"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="departure_date">Departure Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="departure_date"
                      type="date"
                      value={formData.departure_date}
                      onChange={(e) => handleChange('departure_date', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="departure_time">Departure Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="departure_time"
                      type="time"
                      value={formData.departure_time}
                      onChange={(e) => handleChange('departure_time', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="available_seats">Available Seats</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="available_seats"
                      type="number"
                      min="1"
                      max="8"
                      value={formData.available_seats}
                      onChange={(e) => handleChange('available_seats', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Add any additional details about your ride..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                  Update Notice
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Any travelers who have already joined this ride will be notified of the changes.
                  Please make sure to communicate important updates directly with them.
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {loading ? 'Updating...' : 'Update Ride'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}