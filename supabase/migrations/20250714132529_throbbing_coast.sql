/*
  # Fix Ride Join Error - Corrected Syntax

  1. Problem Analysis
    - Users cannot join rides due to RLS policy restrictions
    - Clerk authentication may not be properly recognized by Supabase RLS
    - Previous migration had syntax error with reserved keywords

  2. Changes
    - Fix syntax error in debug function
    - Create more permissive policies for testing
    - Add proper debugging capabilities

  3. Security
    - Temporarily use permissive policies to identify root cause
    - Will implement proper security after fixing functionality
*/

-- Create a corrected debug function without reserved keywords
CREATE OR REPLACE FUNCTION debug_auth_context()
RETURNS TABLE(
  auth_jwt_sub text,
  auth_jwt_email text,
  auth_jwt_full text,
  current_setting_jwt text,
  pg_session_user text,
  pg_current_user text
) AS $$
BEGIN
  RETURN QUERY SELECT 
    auth.jwt() ->> 'sub' as auth_jwt_sub,
    auth.jwt() ->> 'email' as auth_jwt_email,
    auth.jwt()::text as auth_jwt_full,
    current_setting('request.jwt.claims', true) as current_setting_jwt,
    session_user::text as pg_session_user,
    current_user::text as pg_current_user;
EXCEPTION WHEN OTHERS THEN
  RETURN QUERY SELECT 
    'ERROR'::text as auth_jwt_sub,
    'ERROR'::text as auth_jwt_email,
    'ERROR'::text as auth_jwt_full,
    'ERROR'::text as current_setting_jwt,
    'ERROR'::text as pg_session_user,
    'ERROR'::text as pg_current_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a simple function to get current user ID
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS text AS $$
BEGIN
  RETURN COALESCE(
    auth.jwt() ->> 'sub',
    current_setting('request.jwt.claims', true)::json ->> 'sub',
    'anonymous'
  );
EXCEPTION WHEN OTHERS THEN
  RETURN 'error';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop all existing policies for ride_joins
DROP POLICY IF EXISTS "allow_all_select_ride_joins" ON ride_joins;
DROP POLICY IF EXISTS "allow_all_insert_ride_joins" ON ride_joins;
DROP POLICY IF EXISTS "allow_all_update_ride_joins" ON ride_joins;
DROP POLICY IF EXISTS "allow_all_delete_ride_joins" ON ride_joins;

-- Create very permissive policies for testing
CREATE POLICY "test_select_ride_joins"
  ON ride_joins
  FOR SELECT
  USING (true);

CREATE POLICY "test_insert_ride_joins"
  ON ride_joins
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "test_update_ride_joins"
  ON ride_joins
  FOR UPDATE
  USING (true);

CREATE POLICY "test_delete_ride_joins"
  ON ride_joins
  FOR DELETE
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE ride_joins ENABLE ROW LEVEL SECURITY;

-- Create a function to test ride join insertion
CREATE OR REPLACE FUNCTION test_ride_join_insert(
  p_ride_id uuid,
  p_user_id text,
  p_user_email text,
  p_user_name text,
  p_message text DEFAULT 'Test join request'
)
RETURNS uuid AS $$
DECLARE
  new_id uuid;
BEGIN
  INSERT INTO ride_joins (
    ride_id,
    user_id,
    user_email,
    user_name,
    status,
    message
  ) VALUES (
    p_ride_id,
    p_user_id,
    p_user_email,
    p_user_name,
    'pending',
    p_message
  ) RETURNING id INTO new_id;
  
  RETURN new_id;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Insert failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check ride join eligibility
CREATE OR REPLACE FUNCTION can_user_join_ride(
  p_ride_id uuid,
  p_user_id text
)
RETURNS TABLE(
  can_join boolean,
  reason text,
  ride_exists boolean,
  ride_user_id text,
  available_seats integer,
  existing_request_count bigint
) AS $$
BEGIN
  RETURN QUERY
  WITH ride_info AS (
    SELECT 
      r.id,
      r.user_id,
      r.available_seats,
      r.status
    FROM rides r
    WHERE r.id = p_ride_id
  ),
  existing_requests AS (
    SELECT COUNT(*) as request_count
    FROM ride_joins rj
    WHERE rj.ride_id = p_ride_id 
    AND rj.user_id = p_user_id
    AND rj.status IN ('pending', 'accepted')
  )
  SELECT 
    CASE 
      WHEN ri.id IS NULL THEN false
      WHEN ri.user_id = p_user_id THEN false
      WHEN ri.available_seats <= 0 THEN false
      WHEN ri.status != 'active' THEN false
      WHEN er.request_count > 0 THEN false
      ELSE true
    END as can_join,
    CASE 
      WHEN ri.id IS NULL THEN 'Ride does not exist'
      WHEN ri.user_id = p_user_id THEN 'Cannot join own ride'
      WHEN ri.available_seats <= 0 THEN 'No seats available'
      WHEN ri.status != 'active' THEN 'Ride is not active'
      WHEN er.request_count > 0 THEN 'Already have pending/accepted request'
      ELSE 'Can join'
    END as reason,
    ri.id IS NOT NULL as ride_exists,
    ri.user_id as ride_user_id,
    COALESCE(ri.available_seats, 0) as available_seats,
    COALESCE(er.request_count, 0) as existing_request_count
  FROM ride_info ri
  CROSS JOIN existing_requests er;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION debug_auth_context() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION get_current_user_id() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION test_ride_join_insert(uuid, text, text, text, text) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION can_user_join_ride(uuid, text) TO authenticated, anon;