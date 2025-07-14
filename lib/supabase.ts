import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'Present' : 'Missing',
    key: supabaseAnonKey ? 'Present' : 'Missing'
  });
}

console.log('Supabase client initialized with:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey.length
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'travel-with-de'
    }
  }
});

// Test the connection on initialization
supabase
  .from('rides')
  .select('count')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection test successful');
    }
  });

// Simple function to get the regular Supabase client
export const getSupabaseClient = () => {
  return supabase;
};

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