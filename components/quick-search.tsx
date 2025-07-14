"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Search, ArrowRight } from 'lucide-react';

export function QuickSearch() {
  const router = useRouter();
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    date: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchForm.from) params.set('from', searchForm.from);
    if (searchForm.to) params.set('to', searchForm.to);
    if (searchForm.date) params.set('date', searchForm.date);
    
    router.push(`/search?${params.toString()}`);
  };

  const popularSearches = [
    { from: 'Berlin', to: 'Munich', count: '45 rides' },
    { from: 'Hamburg', to: 'Frankfurt', count: '32 rides' },
    { from: 'Cologne', to: 'Düsseldorf', count: '28 rides' },
    { from: 'Stuttgart', to: 'Nuremberg', count: '21 rides' }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Next Ride
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Search thousands of available rides or browse popular routes to find your perfect travel companion.
          </p>
        </div>

        {/* Quick Search Form */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="From (e.g., Berlin)"
                    value={searchForm.from}
                    onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="To (e.g., Munich)"
                    value={searchForm.to}
                    onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={searchForm.date}
                    onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Search className="mr-2 h-5 w-5" />
                Search Rides
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Popular Searches */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Popular Routes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchForm({ from: search.from, to: search.to, date: '' });
                  const params = new URLSearchParams();
                  params.set('from', search.from);
                  params.set('to', search.to);
                  router.push(`/search?${params.toString()}`);
                }}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {search.from} → {search.to}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {search.count}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}