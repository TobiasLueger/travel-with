import { redirect } from 'next/navigation';

export default function TermsPage() {
  // Redirect to the main terms (which handles locale internally)
  redirect('/terms');
}