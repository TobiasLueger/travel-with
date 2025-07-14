import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return new NextResponse('Webhook signature verification failed', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const userId = session.metadata?.userId;
        
        if (userId) {
          await supabase
            .from('subscriptions')
            .upsert({
              user_id: userId,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              status: 'active',
              current_period_end: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days trial
            });
        }
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        
        // Type assertion to ensure we have the correct Stripe subscription object
        const stripeSubscription = subscription as any;
        
        await supabase
          .from('subscriptions')
          .update({
            status: stripeSubscription.status,
            current_period_end: stripeSubscription.current_period_end 
              ? new Date(stripeSubscription.current_period_end * 1000) 
              : null,
          })
          .eq('stripe_subscription_id', stripeSubscription.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new NextResponse('Error handling webhook', { status: 500 });
  }
}