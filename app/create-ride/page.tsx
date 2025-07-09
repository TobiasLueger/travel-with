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
      const { error } = await supabase
        .from('rides')
        .insert({
          user_id: user.id,
          user_email: user.emailAddresses[0]?.emailAddress || '',
          user_name: user.fullName || 'Anonymous',
          title: formData.title,
          description: formData.description,
          from_location: formData.from_location,
          to_location: formData.to_location,
          departure_date: formData.departure_date,
          departure_time: formData.departure_time,
          available_seats: parseInt(formData.available_seats),
          transport_type: formData.transport_type,
          price_per_person: parseFloat(formData.price_per_person),
          status: 'active'
        });

      if (error) throw error;

      toast.success('Ride created successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating ride:', error);
      toast.error('Failed to create ride');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create a New Ride
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Offer a ride and connect with fellow travelers going your way.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5" />
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

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                  Free Community Ride
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  This ride is offered for free as part of our community spirit. 
                  Travelers can share costs like gas or train tickets voluntarily.
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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