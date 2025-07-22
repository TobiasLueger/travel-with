"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, MapPin, Calendar, Clock, Users, Car, Train, Bus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function CreateRidePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Debug: Log user information
      console.log('User object:', {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        username: user.username,
        fullName: user.fullName
      });

      // Validate form data
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.from_location.trim()) {
        throw new Error('From location is required');
      }
      if (!formData.to_location.trim()) {
        throw new Error('To location is required');
      }
      if (!formData.departure_date) {
        throw new Error('Departure date is required');
      }
      if (!formData.departure_time) {
        throw new Error('Departure time is required');
      }

      const rideData = {
        user_id: user.id,
        user_email: user.emailAddresses[0]?.emailAddress || '',
        user_name: user.username || user.fullName || 'Anonymous',
        title: formData.title.trim(),
        description: formData.description.trim(),
        from_location: formData.from_location.trim(),
        to_location: formData.to_location.trim(),
        departure_date: formData.departure_date,
        departure_time: formData.departure_time,
        available_seats: parseInt(formData.available_seats),
        transport_type: formData.transport_type,
        price_per_person: parseFloat(formData.price_per_person),
        status: 'active'
      };

      console.log('Creating ride with data:', rideData);
      
      // Test database connection first
      const { data: testData, error: testError } = await supabase
        .from('rides')
        .select('count')
        .limit(1);
      
      if (testError) {
        console.error('Database connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }
      
      console.log('Database connection test passed');

      const { data, error } = await supabase
        .from('rides')
        .insert(rideData)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(error.message || 'Failed to create ride');
      }

      console.log('Ride created successfully:', data);
      toast.success('Ride created successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating ride:', error);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      const errorMessage = error instanceof Error ? error.message : 'Failed to create ride';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="max-w-4xl mx-auto mt-[5rem] container-padding section-padding">
        <div className="mb-12">
          <h1 className="text-display text-black dark:text-white mb-4">
            Create a New Ride
          </h1>
          <p className="text-body-large text-gray-600 dark:text-gray-400">
            Offer a ride and connect with fellow travelers going your way.
          </p>
        </div>

        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center text-black dark:text-white">
              <Plus className="mr-2 h-5 w-5" />
              Ride Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="title" className="text-black dark:text-white font-medium mb-2 block">Ride Title</Label>
                  <Input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., Berlin to Munich"
                    className="modern-input"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="transport_type" className="text-black dark:text-white font-medium mb-2 block">Transport Type</Label>
                  <select
                    id="transport_type"
                    value={formData.transport_type}
                    onChange={(e) => handleChange('transport_type', e.target.value)}
                    className="modern-input"
                    required
                  >
                    <option value="car">Car</option>
                    <option value="train">Train</option>
                    <option value="bus">Bus</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="from_location" className="text-black dark:text-white font-medium mb-2 block">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      id="from_location"
                      type="text"
                      value={formData.from_location}
                      onChange={(e) => handleChange('from_location', e.target.value)}
                      placeholder="Departure location"
                      className="modern-input pl-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="to_location" className="text-black dark:text-white font-medium mb-2 block">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      id="to_location"
                      type="text"
                      value={formData.to_location}
                      onChange={(e) => handleChange('to_location', e.target.value)}
                      placeholder="Destination"
                      className="modern-input pl-12"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <Label htmlFor="departure_date" className="text-black dark:text-white font-medium mb-2 block">Departure Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      id="departure_date"
                      type="date"
                      value={formData.departure_date}
                      onChange={(e) => handleChange('departure_date', e.target.value)}
                      className="modern-input pl-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="departure_time" className="text-black dark:text-white font-medium mb-2 block">Departure Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      id="departure_time"
                      type="time"
                      value={formData.departure_time}
                      onChange={(e) => handleChange('departure_time', e.target.value)}
                      className="modern-input pl-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="available_seats" className="text-black dark:text-white font-medium mb-2 block">Available Seats</Label>
                  <div className="relative">
                    <Users className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      id="available_seats"
                      type="number"
                      min="1"
                      max="8"
                      value={formData.available_seats}
                      onChange={(e) => handleChange('available_seats', e.target.value)}
                      className="modern-input pl-12"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-black dark:text-white font-medium mb-2 block">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Add any additional details about your ride..."
                  className="modern-input resize-none"
                  rows={3}
                />
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
                <h3 className="font-bold text-green-800 dark:text-green-400 mb-3">
                  Free Community Ride
                </h3>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  This ride is offered for free as part of our community spirit. 
                  Travelers can share costs like gas or train tickets voluntarily.
                </p>
              </div>

              <div className="flex justify-end space-x-6 pt-4">
                <Button
                  type="button"
                  className="btn-modern-outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-modern"
                >
                  {loading ? 'Creating...' : 'Create Ride'}
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