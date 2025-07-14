import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

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

// Create a function to get Supabase client with Clerk token
export const getSupabaseWithAuth = async (clerkToken?: string) => {
  if (clerkToken) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          'Authorization': `Bearer ${clerkToken}`,
          'X-Client-Info': 'travel-with-de'
        }
      }
    });
  }
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