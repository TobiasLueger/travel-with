import { redirect } from 'next/navigation';

export default function CookiesPage() {
  // Redirect to the main cookies (which handles locale internally)
  redirect('/cookies');
}