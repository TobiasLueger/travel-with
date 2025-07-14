/*
  # Fix Delete Policy for Rides

  1. Policy Changes
    - Update the delete policy to use the correct Clerk user ID format
    - Ensure users can delete their own rides

  2. Security
    - Maintain RLS protection
    - Only allow users to delete their own rides
*/

-- Drop the existing delete policy
DROP POLICY IF EXISTS "Users can delete their own rides" ON rides;

-- Create a new delete policy that works with Clerk user IDs
CREATE POLICY "Users can delete their own rides"
  ON rides
  FOR DELETE
  USING (user_id = auth.jwt() ->> 'sub');

-- Also update the update policy to ensure consistency
DROP POLICY IF EXISTS "Users can update their own rides" ON rides;

CREATE POLICY "Users can update their own rides"
  ON rides
  FOR UPDATE
  USING (user_id = auth.jwt() ->> 'sub');