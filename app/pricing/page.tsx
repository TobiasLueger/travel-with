"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users, Shield, Zap } from 'lucide-react';
import { createCheckoutSession } from '@/lib/stripe';
import toast from 'react-hot-toast';
import { useSubscription } from '@/hooks/use-subscription';

export default function PricingPage() {
  const { user } = useUser();
  const { isPremium, isTrialActive, subscription } = useSubscription();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user.emailAddresses[0]?.emailAddress || '',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }
      
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start subscription process');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Unlimited ride searches',
    'Create unlimited rides',
    'Priority customer support',
    'Advanced search filters',
    'Ride history and analytics',
    'Premium user badge',
    'Early access to new features'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="max-w-7xl mx-auto mt-[5rem] container-padding section-padding">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-white dark:bg-black rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 mb-8 shadow-sm">
            <Star className="w-4 h-4 mr-2" />
            Pricing Plans
          </div>
          <h1 className="text-display text-black dark:text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-body-large text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Start with our free community features, then upgrade to Premium 
            for the full travel-with.de experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
          {/* Free Plan */}
          <Card className="modern-card relative">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-black dark:text-white mb-4">
                Community
              </CardTitle>
              <div className="text-5xl font-black text-black dark:text-white mb-2">
                Free
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Perfect for occasional travelers
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-4" />
                  <span className="text-gray-700 dark:text-gray-300">Search and browse rides</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-4" />
                  <span className="text-gray-700 dark:text-gray-300">Create up to 3 rides per month</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-4" />
                  <span className="text-gray-700 dark:text-gray-300">Basic messaging</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-4" />
                  <span className="text-gray-700 dark:text-gray-300">Community support</span>
                </div>
              </div>
              <Button className="w-full btn-modern-outline opacity-50 cursor-not-allowed" disabled>
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="modern-card relative border-2 border-black dark:border-white">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-sm font-bold flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-black dark:text-white mb-4">
                Premium
              </CardTitle>
              <div className="text-5xl font-black text-black dark:text-white mb-2">
                €9.99
                <span className="text-xl font-normal text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Full access to all features
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-200 dark:border-green-800 mt-4">
                <p className="text-green-700 dark:text-green-300 font-bold">
                  🎉 First 2 months FREE!
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-4" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleSubscribe}
                disabled={loading || isPremium}
                className="w-full btn-modern"
              >
                {loading ? 'Processing...' : 
                 isPremium ? 'Already Subscribed' : 'Start Free Trial'}
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
                {isPremium ? 
                  `Active until ${subscription?.current_period_end ? 
                    new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}` :
                  'Cancel anytime. No hidden fees.'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-headline text-black dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <Card className="modern-card">
              <CardContent className="p-8">
                <h3 className="font-bold text-black dark:text-white mb-3 text-lg">
                  What happens after the free trial?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  After your 2-month free trial, you'll be automatically charged €9.99/month. 
                  You can cancel anytime before the trial ends with no charge.
                </p>
              </CardContent>
            </Card>
            <Card className="modern-card">
              <CardContent className="p-8">
                <h3 className="font-bold text-black dark:text-white mb-3 text-lg">
                  Can I cancel my subscription?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Yes! You can cancel your subscription anytime through your account settings. 
                  You'll continue to have Premium access until the end of your current billing period.
                </p>
              </CardContent>
            </Card>
            <Card className="modern-card">
              <CardContent className="p-8">
                <h3 className="font-bold text-black dark:text-white mb-3 text-lg">
                  Are rides still free with Premium?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Absolutely! All rides remain free for everyone. Premium just gives you 
                  additional features to enhance your travel experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}