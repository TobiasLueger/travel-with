'use client';

import React from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export function QuickSearch() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Perfect Ride
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Search thousands of available rides and connect with fellow travelers going your way
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-12">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Departure city"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Destination city"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Passengers
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white appearance-none">
                  <option>1 passenger</option>
                  <option>2 passengers</option>
                  <option>3 passengers</option>
                  <option>4+ passengers</option>
                </select>
              </div>
            </div>
          </form>

          <div className="mt-8 text-center">
            <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Rides
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">Paris → Lyon</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">€25 avg</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">Berlin → Munich</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">€35 avg</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">Madrid → Barcelona</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">€30 avg</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">Rome → Milan</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">€28 avg</div>
          </div>
        </div>
      </div>
    </section>
  );
}