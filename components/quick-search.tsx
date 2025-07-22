"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Search, ArrowRight, TrendingUp } from 'lucide-react';

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
    <section className="section-padding bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-display text-black dark:text-white mb-6">
            Find Your Next Ride
          </h2>
          <p className="text-body-large text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Search thousands of available rides or browse popular routes to find your perfect travel companion.
          </p>
        </div>

        {/* Quick Search Form */}
        <Card className="max-w-5xl mx-auto mb-16 modern-card">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSearch} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="From (e.g., Berlin)"
                    value={searchForm.from}
                    onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
                    className="modern-input pl-14 h-16 text-lg"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="To (e.g., Munich)"
                    value={searchForm.to}
                    onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
                    className="modern-input pl-14 h-16 text-lg"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={searchForm.date}
                    onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                    className="modern-input pl-14 h-16 text-lg"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-16 btn-modern text-lg group">
                <Search className="mr-3 h-6 w-6" />
                Search Rides
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Popular Searches */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <TrendingUp className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-headline text-black dark:text-white">
              Popular Routes
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="modern-card emotional-hover p-8 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-black dark:text-white mb-1">
                        {search.from} → {search.to}
                      </div>
                      <div className="text-gray-500 dark:text-gray-500">
                        {search.count}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-all duration-300 group-hover:translate-x-2" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
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