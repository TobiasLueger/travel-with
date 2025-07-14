/*
  # Fix RLS Policies for Ride Joins Delete

  1. Policy Changes
    - Add proper delete policy for ride_joins table
    - Allow users to delete their own join requests
    - Maintain security while enabling cancellation

  2. Security
    - Users can only delete their own join requests
    - Ride owners cannot delete join requests (only update status)
    - Maintain all existing functionality
*/

-- Add delete policy for ride_joins table
CREATE POLICY "Users can delete their own join requests"
  ON ride_joins
  FOR DELETE
  USING (user_id = auth.jwt() ->> 'sub');

-- Also ensure users can view their own join requests
DROP POLICY IF EXISTS "Anyone can view join requests" ON ride_joins;

CREATE POLICY "Users can view relevant join requests"
  ON ride_joins
  FOR SELECT
  USING (
    -- Users can see their own join requests
    user_id = auth.jwt() ->> 'sub'
    OR
    -- Ride owners can see join requests for their rides
    EXISTS (
      SELECT 1 FROM rides
      WHERE rides.id = ride_joins.ride_id
      AND rides.user_id = auth.jwt() ->> 'sub'
    )
  );

-- Update the insert policy to be more specific
DROP POLICY IF EXISTS "Anyone can create join requests" ON ride_joins;

CREATE POLICY "Users can create join requests"
  ON ride_joins
  FOR INSERT
  WITH CHECK (user_id = auth.jwt() ->> 'sub');

-- Update the update policy to be more specific
DROP POLICY IF EXISTS "Anyone can update join requests" ON ride_joins;

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