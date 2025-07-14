import { redirect } from 'next/navigation';

export default function SearchPage() {
  // Redirect to the main search (which handles locale internally)
  redirect('/search');
}