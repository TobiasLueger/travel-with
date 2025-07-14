import { redirect } from 'next/navigation';

export default function PricingPage() {
  // Redirect to the main pricing (which handles locale internally)
  redirect('/pricing');
}