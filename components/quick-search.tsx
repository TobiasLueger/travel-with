'use client';

import React from 'react';
import { RideSearchForm } from './ride-search-form';

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
        <RideSearchForm />
      </div>
    </section>
  );
}