-- Initial Data Setup for goHuddleUp
-- Run this after the main schema to add sample data

-- Add some sample regions (you'll need to replace with your actual regions)
INSERT INTO regions (name, state_id) VALUES
  ('North Central Region', (SELECT id FROM states WHERE code = 'TX')),
  ('South Central Region', (SELECT id FROM states WHERE code = 'TX')),
  ('East Region', (SELECT id FROM states WHERE code = 'TX')),
  ('West Region', (SELECT id FROM states WHERE code = 'TX'));

-- Add some sample schools
INSERT INTO schools (name, address, city, state, region_id) VALUES
  ('Lincoln High School', '1234 Main St', 'Houston', 'TX', (SELECT id FROM regions WHERE name = 'North Central Region' LIMIT 1)),
  ('Riverside Academy', '5678 Oak Ave', 'Dallas', 'TX', (SELECT id FROM regions WHERE name = 'South Central Region' LIMIT 1)),
  ('Central High School', '9012 Pine Rd', 'Austin', 'TX', (SELECT id FROM regions WHERE name = 'East Region' LIMIT 1)),
  ('Westside Prep', '3456 Elm St', 'San Antonio', 'TX', (SELECT id FROM regions WHERE name = 'West Region' LIMIT 1));

-- Add some sample huddles
INSERT INTO huddles (school_id, name) VALUES
  ((SELECT id FROM schools WHERE name = 'Lincoln High School'), 'Lincoln FCA Huddle'),
  ((SELECT id FROM schools WHERE name = 'Riverside Academy'), 'Riverside FCA Huddle'),
  ((SELECT id FROM schools WHERE name = 'Central High School'), 'Central FCA Huddle'),
  ((SELECT id FROM schools WHERE name = 'Westside Prep'), 'Westside FCA Huddle');

-- Create a super admin user (you'll need to create the auth user first)
-- This is just a placeholder - you'll need to create the actual user through the app
-- INSERT INTO users (id, email, role, status) VALUES 
--   ('your-user-id-here', 'admin@gohuddleup.com', 'SUPER', 'ACTIVE');

-- INSERT INTO role_assignments (user_id, role, scope_type, scope_id) VALUES
--   ('your-user-id-here', 'SUPER', 'STATE', (SELECT id FROM states WHERE code = 'TX'));
