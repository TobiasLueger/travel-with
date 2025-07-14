import { redirect } from 'next/navigation';

export default function PrivacyPage() {
  // Redirect to the main privacy (which handles locale internally)
  redirect('/privacy');
}