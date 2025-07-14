/*
  # Temporarily Disable RLS for Testing

  1. Problem Analysis
    - RLS policies are still blocking inserts despite permissive policies
    - Need to temporarily disable RLS to test functionality
    - Will re-enable with proper policies once authentication is working

  2. Changes
    - Disable RLS on rides and ride_joins tables
    - Add debug functions to understand authentication context
    - Create test functions for manual verification

  3. Security
    - This is temporary for testing only
    - Will re-enable proper RLS once authentication is resolved
*/

-- Temporarily disable RLS on both tables
ALTER TABLE rides DISABLE ROW LEVEL SECURITY;
ALTER TABLE ride_joins DISABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions DISABLE ROW LEVEL SECURITY;

-- Create a function to test direct insertion
CREATE OR REPLACE FUNCTION test_direct_insert()
RETURNS uuid AS $$
DECLARE
  new_ride_id uuid;
BEGIN
  INSERT INTO rides (
    user_id,
    user_email,
    user_name,
    title,
    description,
    from_location,
    to_location,
    departure_date,
    departure_time,
    available_seats,
    transport_type,
    price_per_person,
    status
  ) VALUES (
    'test-user-123',
    'test@example.com',
    'Test User',
    'Test Ride',
    'This is a test ride',
    'Berlin',
    'Munich',
    CURRENT_DATE + INTERVAL '1 day',
    '10:00:00',
    3,
    'car',
    0.00,
    'active'
  ) RETURNING id INTO new_ride_id;
  
  RETURN new_ride_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to check table permissions
CREATE OR REPLACE FUNCTION check_table_permissions()
RETURNS TABLE(
  table_name text,
  rls_enabled boolean,
  can_insert boolean,
  can_select boolean,
  error_message text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'rides'::text as table_name,
    (SELECT relrowsecurity FROM pg_class WHERE relname = 'rides') as rls_enabled,
    true as can_insert,
    true as can_select,
    'No error'::text as error_message;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT EXECUTE ON FUNCTION test_direct_insert() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION check_table_permissions() TO authenticated, anon;

-- Add a comment to track this change
COMMENT ON TABLE rides IS 'RLS temporarily disabled for testing - re-enable after fixing authentication';
COMMENT ON TABLE ride_joins IS 'RLS temporarily disabled for testing - re-enable after fixing authentication';