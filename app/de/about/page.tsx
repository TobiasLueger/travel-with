import { redirect } from 'next/navigation';

export default function AboutPage() {
  // Redirect to the main about (which handles locale internally)
  redirect('/about');
}