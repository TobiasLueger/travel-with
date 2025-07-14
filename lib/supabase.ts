import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Debug environment variables
console.log('🔧 Supabase Config:', {
  url: supabaseUrl ? '✅ Set' : '❌ Missing',
  key: supabaseAnonKey ? '✅ Set' : '❌ Missing'
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    debug: process.env.NODE_ENV === 'development'
  },
  global: {
    headers: {
      'X-Client-Info': 'travel-with-de'
    }
  }
});

// Add auth state change listener for debugging
if (process.env.NODE_ENV === 'development') {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔐 Auth state change:', event, session?.user?.id);
  });
}

export interface Ride {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  title: string;
  description: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  departure_time: string;
  available_seats: number;
  transport_type: 'car' | 'train' | 'bus' | 'other';
  price_per_person: number;
  status: 'active' | 'cancelled' | 'completed';
  user_email: string;
  user_name: string;
}

export interface RideJoin {
  id: string;
  created_at: string;
  ride_id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
}