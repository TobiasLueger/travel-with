/*
  # Fix Ride Join Policies for Clerk Authentication

  1. Problem Analysis
    - Current RLS policies may be too restrictive for Clerk authentication
    - Users cannot join rides due to authentication context issues
    - Need to ensure proper user identification in policies

  2. Changes
    - Simplify RLS policies to work with Clerk's JWT structure
    - Ensure users can create join requests
    - Maintain security while fixing functionality

  3. Security
    - Users can only create join requests with their own user_id
    - Users can view their own join requests and requests for their rides
    - Ride owners can manage join requests for their rides
*/

-- First, let's check if the auth.jwt() function works properly with Clerk
-- Drop all existing policies for ride_joins to start fresh
DROP POLICY IF EXISTS "Users can view relevant join requests" ON ride_joins;
DROP POLICY IF EXISTS "Users can create join requests" ON ride_joins;
DROP POLICY IF EXISTS "Ride owners can update join requests" ON ride_joins;
DROP POLICY IF EXISTS "Users can delete their own join requests" ON ride_joins;

-- Create simplified policies that should work with Clerk authentication
-- Policy for viewing join requests
CREATE POLICY "View join requests policy"
  ON ride_joins
  FOR SELECT
  USING (
    -- Users can see their own join requests
    user_id = COALESCE(auth.jwt() ->> 'sub', current_setting('request.jwt.claims', true)::json ->> 'sub')
    OR
    -- Ride owners can see join requests for their rides
    EXISTS (
      SELECT 1 FROM rides
      WHERE rides.id = ride_joins.ride_id
      AND rides.user_id = COALESCE(auth.jwt() ->> 'sub', current_setting('request.jwt.claims', true)::json ->> 'sub')
    )
  );

-- Policy for creating join requests
CREATE POLICY "Create join requests policy"
  ON ride_joins
  FOR INSERT
  WITH CHECK (
    user_id = COALESCE(auth.jwt() ->> 'sub', current_setting('request.jwt.claims', true)::json ->> 'sub')
  );

-- Policy for updating join requests (for ride owners to accept/reject)
CREATE POLICY "Update join requests policy"
  ON ride_joins
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM rides
      WHERE rides.id = ride_joins.ride_id
      AND rides.user_id = COALESCE(auth.jwt() ->> 'sub', current_setting('request.jwt.claims', true)::json ->> 'sub')
    )
  );

-- Policy for deleting join requests (users can cancel their own requests)
CREATE POLICY "Delete join requests policy"
  ON ride_joins
  FOR DELETE
  USING (
    user_id = COALESCE(auth.jwt() ->> 'sub', current_setting('request.jwt.claims', true)::json ->> 'sub')
  );

-- Also update the rides policies to be more compatible with Clerk
DROP POLICY IF EXISTS "Anyone can view rides" ON rides;
DROP POLICY IF EXISTS "Anyone can create rides" ON rides;
DROP POLICY IF EXISTS "Anyone can update rides" ON rides;
DROP POLICY IF EXISTS "Anyone can delete rides" ON rides;

-- Create proper rides policies
CREATE POLICY "View rides policy"
  ON rides
  FOR SELECT
  USING (true); -- Anyone can view rides

CREATE POLICY "Create rides policy"
  ON rides
  FOR INSERT
  WITH CHECK (
    user_id = COALESCE(auth.jwt() ->> 'sub', current_setting('request.jwt.claims', true)::json ->> 'sub')
  );

CREATE POLICY "Update rides policy"
  ON rides
  FOR UPDATE
  USING (
    user_id = COALESCE(auth.jwt() ->> 'sub', current_setting('request.jwt.claims', true)::json ->> 'sub')
  );

CREATE POLICY "Delete rides policy"
  ON rides
  FOR DELETE
  USING (
    user_id = COALESCE(auth.jwt() ->> 'sub', current_setting('request.jwt.claims', true)::json ->> 'sub')
  );

-- Ensure RLS is enabled on both tables
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_joins ENABLE ROW LEVEL SECURITY;

-- Create a function to help debug authentication issues
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS text AS $$
BEGIN
  RETURN COALESCE(
    auth.jwt() ->> 'sub',
    current_setting('request.jwt.claims', true)::json ->> 'sub',
    'anonymous'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;