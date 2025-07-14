import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export default stripePromise;

export const createCheckoutSession = async (userId: string, userEmail: string) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: userEmail,
    mode: 'subscription',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Travel-with.de Premium',
            description: 'Access to all premium features',
          },
          unit_amount: 999, // €9.99 per month
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: 60, // 2-month free trial
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing`,
    metadata: {
      userId,
    },
  });

  return session;
};