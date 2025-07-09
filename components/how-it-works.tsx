"use client";

import { MapPin, Palette, Camera, BookOpen } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Add your route to the app',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-black',
      iconBg: 'bg-black'
    },
    {
      step: '2', 
      title: 'Select the transport you prefer',
      icon: <div className="flex space-x-0.5">
        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
        <div className="w-1 h-4 bg-yellow-500 rounded-full"></div>
      </div>,
      color: 'bg-white border border-gray-200',
      iconBg: 'bg-white'
    },
    {
      step: '3',
      title: 'Use the camera to simply find your way',
      icon: <div className="flex space-x-0.5">
        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
        <div className="w-1 h-4 bg-red-500 rounded-full"></div>
        <div className="w-1 h-4 bg-yellow-500 rounded-full"></div>
      </div>,
      color: 'bg-white border border-gray-200',
      iconBg: 'bg-white'
    },
    {
      step: '4',
      title: 'Read info about the transport that you use',
      icon: <div className="flex space-x-0.5">
        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
        <div className="w-1 h-4 bg-red-500 rounded-full"></div>
        <div className="w-1 h-4 bg-yellow-500 rounded-full"></div>
        <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
      </div>,
      color: 'bg-white border border-gray-200',
      iconBg: 'bg-white'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How it works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg`}>
                <div className="text-white">
                  {step.icon}
                </div>
              </div>
              <div className="mb-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Step {step.step}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs mx-auto">
                {step.title}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom illustration */}
        <div className="relative h-80 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 rounded-3xl overflow-hidden">
          {/* Map grid lines */}
          <div className="absolute inset-0">
            {/* Horizontal lines */}
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-yellow-400/40"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-400/40"></div>
            <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-yellow-400/40"></div>
            
            {/* Vertical lines */}
            <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-yellow-400/40"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-400/40"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-yellow-400/40"></div>
            
            {/* Curved lines */}
            <div className="absolute top-1/3 left-1/4 w-1/2 h-0.5 bg-yellow-400/40 transform rotate-12"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1/3 h-0.5 bg-yellow-400/40 transform -rotate-12"></div>
          </div>
          
          {/* Central white circle */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/90 rounded-full backdrop-blur-sm flex items-center justify-center">
            {/* Transportation icons in circle */}
            <div className="absolute top-4 w-6 h-6 bg-red-500 rounded-full"></div>
            <div className="absolute left-4 w-4 h-4 bg-gray-400 rounded-sm"></div>
            <div className="absolute right-4 w-4 h-4 bg-gray-400 rounded-sm"></div>
          </div>
          
          {/* Character illustrations around the circle */}
          <div className="absolute inset-0">
            {/* Left character - person in blue */}
            <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-8">
              <div className="w-16 h-20 relative">
                {/* Head */}
                <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto mb-1"></div>
                {/* Body */}
                <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto"></div>
              </div>
            </div>
            
            {/* Center character - person in leopard print */}
            <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2">
              <div className="w-16 h-20 relative">
                {/* Head */}
                <div className="w-8 h-8 bg-yellow-600 rounded-full mx-auto mb-1"></div>
                {/* Body */}
                <div className="w-12 h-12 bg-yellow-600 rounded-lg mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-yellow-800 opacity-30" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 20%, transparent 2px, currentColor 2px, currentColor 4px, transparent 4px)'
                  }}></div>
                </div>
              </div>
            </div>
            
            {/* Right character - person in pink */}
            <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-8">
              <div className="w-16 h-20 relative">
                {/* Head */}
                <div className="w-8 h-8 bg-pink-300 rounded-full mx-auto mb-1"></div>
                {/* Body */}
                <div className="w-12 h-12 bg-pink-500 rounded-lg mx-auto"></div>
              </div>
            </div>
          </div>
          
          {/* Scattered dots */}
          <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-3/4 right-1/6 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}