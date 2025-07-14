import { redirect } from 'next/navigation';

export default function CreateRidePage() {
  // Redirect to the main create-ride (which handles locale internally)
  redirect('/create-ride');
}