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
    <section className="section-padding bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-white dark:bg-black rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 mb-8 shadow-sm">
            <Users className="w-4 h-4 mr-2" />
            Community Impact
          </div>
          <h2 className="text-display text-black dark:text-white mb-6">
            Our Community Impact
          </h2>
          <p className="text-body-large text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Together, we're building a more connected and sustainable way to travel. See how our community is making a difference.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {getStats().map((stat, index) => (
            <Card key={index} className="modern-card emotional-hover text-center group">
              <CardContent className="p-8">
                <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-all duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-black dark:text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-lg font-bold text-black dark:text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-500">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <Card key={index} className="modern-card emotional-hover">
              <CardContent className="p-8 flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-3xl flex items-center justify-center text-white dark:text-black flex-shrink-0">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-white mb-2 text-lg">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-black dark:bg-white text-white dark:text-black modern-card">
          <CardContent className="p-12 text-center">
            <h3 className="text-headline mb-6">
              Ready to Join Our Community?
            </h3>
            <p className="text-body-large mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Start your journey today. Find rides, meet new people, and help build a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => router.push('/search')}
                className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
              >
                <Search className="mr-2 h-4 w-4" />
                Find a Ride
              </Button>
              <Button 
                onClick={() => router.push('/create-ride')}
                className="bg-transparent border-2 border-white dark:border-black text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white rounded-full px-8 py-4 font-semibold transition-all duration-300"
              >
                <Plus className="mr-2 h-4 w-4" />
                Offer a Ride
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}