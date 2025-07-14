"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Heart, Leaf, TrendingUp, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface CommunityData {
  totalUsers: number;
  totalRides: number;
  activeRides: number;
}
export function CommunityStats() {
  const router = useRouter();
  const [communityData, setCommunityData] = useState<CommunityData>({
    totalUsers: 0,
    totalRides: 0,
    activeRides: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchCommunityData = async () => {
    try {
      // Get total rides count
      const { count: totalRidesCount, error: ridesError } = await supabase
        .from('rides')
        .select('*', { count: 'exact', head: true });

      if (ridesError) throw ridesError;

      // Get active rides count
      const { count: activeRidesCount, error: activeError } = await supabase
        .from('rides')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')
        .gte('departure_date', new Date().toISOString().split('T')[0]);

      if (activeError) throw activeError;

      // Get unique users count (approximate from rides)
      const { data: uniqueUsers, error: usersError } = await supabase
        .from('rides')
        .select('user_id');

      if (usersError) throw usersError;

      const uniqueUserIds = new Set(uniqueUsers?.map(ride => ride.user_id) || []);

      setCommunityData({
        totalUsers: uniqueUserIds.size,
        totalRides: totalRidesCount || 0,
        activeRides: activeRidesCount || 0
      });
    } catch (error) {
      console.error('Error fetching community data:', error);
      // Fallback to default values
      setCommunityData({
        totalUsers: 0,
        totalRides: 0,
        activeRides: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M+`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K+`;
    } else if (num === 0) {
      return 'Growing';
    }
    return num.toString();
  };

  const getStats = () => [
    {
      icon: <Users className="h-8 w-8" />,
      value: formatNumber(communityData.totalUsers),
      label: 'Active Travelers',
      description: 'Join our growing community',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      value: formatNumber(communityData.totalRides),
      label: 'Rides Shared',
      description: 'Successful journeys completed',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      value: '100%',
      label: 'Free Rides',
      description: 'Community-driven sharing',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      value: communityData.totalRides > 0 ? `${Math.round(communityData.totalRides * 0.05)} tons` : 'Growing',
      label: 'CO₂ Saved',
      description: 'Environmental impact',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const achievements = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Growing Fast',
      description: '+25% new users this month'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Nationwide Coverage',
      description: 'Available in all German cities'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Trusted Community',
      description: '4.8/5 average user rating'
    }
  ];

  useEffect(() => {
    fetchCommunityData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Community Impact
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Community Impact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Together, we're building a more connected and sustainable way to travel. See how our community is making a difference.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {getStats().map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {achievement.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Start your journey today. Find rides, meet new people, and help build a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push('/search')}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Find a Ride
              </Button>
              <Button 
                onClick={() => router.push('/create-ride')}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Offer a Ride
              </Button>
              {formatNumber(communityData.activeRides)}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}