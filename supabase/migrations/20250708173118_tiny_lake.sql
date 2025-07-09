/*
  # Initial Schema for Travel-with.de

  1. New Tables
    - `rides`
      - `id` (uuid, primary key)
      - `user_id` (text, references auth.users)
      - `user_email` (text)
      - `user_name` (text)
      - `title` (text)
      - `description` (text)
      - `from_location` (text)
      - `to_location` (text)
      - `departure_date` (date)
      - `departure_time` (time)
      - `available_seats` (integer)
      - `transport_type` (text)
      - `price_per_person` (decimal)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `ride_joins`
      - `id` (uuid, primary key)
      - `ride_id` (uuid, references rides)
      - `user_id` (text, references auth.users)
      - `user_email` (text)
      - `user_name` (text)
      - `status` (text)
      - `message` (text)
      - `created_at` (timestamp)
    
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (text, references auth.users)
      - `stripe_customer_id` (text)
      - `stripe_subscription_id` (text)
      - `status` (text)
      - `current_period_end` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for ride creators and participants
*/

-- Create rides table
CREATE TABLE IF NOT EXISTS rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  user_email text NOT NULL,
  user_name text NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  from_location text NOT NULL,
  to_location text NOT NULL,
  departure_date date NOT NULL,
  departure_time time NOT NULL,
  available_seats integer NOT NULL DEFAULT 1,
  transport_type text NOT NULL CHECK (transport_type IN ('car', 'train', 'bus', 'other')),
  price_per_person decimal(10,2) NOT NULL DEFAULT 0.00,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ride_joins table
CREATE TABLE IF NOT EXISTS ride_joins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id uuid NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  user_email text NOT NULL,
  user_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL UNIQUE,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'cancelled')),
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_joins ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for rides table
CREATE POLICY "Anyone can view active rides"
  ON rides
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can create rides"
  ON rides
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own rides"
  ON rides
  FOR UPDATE
  USING (user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can delete their own rides"
  ON rides
  FOR DELETE
  USING (user_id = auth.jwt() ->> 'sub');

-- Policies for ride_joins table
CREATE POLICY "Users can view join requests for their rides"
  ON ride_joins
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rides
      WHERE rides.id = ride_joins.ride_id
      AND rides.user_id = auth.jwt() ->> 'sub'
    )
    OR user_id = auth.jwt() ->> 'sub'
  );

CREATE POLICY "Users can create join requests"
  ON ride_joins
  FOR INSERT
  WITH CHECK (user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Ride owners can update join requests"
  ON ride_joins
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM rides
      WHERE rides.id = ride_joins.ride_id
      AND rides.user_id = auth.jwt() ->> 'sub'
    )
  );

-- Policies for subscriptions table
CREATE POLICY "Users can view their own subscription"
  ON subscriptions
  FOR SELECT
  USING (user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can manage their own subscription"
  ON subscriptions
  FOR ALL
  USING (user_id = auth.jwt() ->> 'sub');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rides_user_id ON rides(user_id);
CREATE INDEX IF NOT EXISTS idx_rides_departure_date ON rides(departure_date);
CREATE INDEX IF NOT EXISTS idx_rides_from_location ON rides(from_location);
CREATE INDEX IF NOT EXISTS idx_rides_to_location ON rides(to_location);
CREATE INDEX IF NOT EXISTS idx_rides_transport_type ON rides(transport_type);
CREATE INDEX IF NOT EXISTS idx_rides_status ON rides(status);

CREATE INDEX IF NOT EXISTS idx_ride_joins_ride_id ON ride_joins(ride_id);
CREATE INDEX IF NOT EXISTS idx_ride_joins_user_id ON ride_joins(user_id);
CREATE INDEX IF NOT EXISTS idx_ride_joins_status ON ride_joins(status);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_rides_updated_at
  BEFORE UPDATE ON rides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();