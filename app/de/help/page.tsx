import { redirect } from 'next/navigation';

export default function HelpPage() {
  // Redirect to the main help (which handles locale internally)
  redirect('/help');
}