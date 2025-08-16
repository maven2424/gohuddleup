-- Enhanced Student Profiles Migration
-- This migration adds comprehensive FCA-specific fields to student profiles

-- Add profile picture URL to students table
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender VARCHAR(20),
ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS emergency_contact_relationship VARCHAR(50),
ADD COLUMN IF NOT EXISTS medical_conditions TEXT,
ADD COLUMN IF NOT EXISTS allergies TEXT,
ADD COLUMN IF NOT EXISTS dietary_restrictions TEXT,
ADD COLUMN IF NOT EXISTS t_shirt_size VARCHAR(10),
ADD COLUMN IF NOT EXISTS hoodie_size VARCHAR(10),
ADD COLUMN IF NOT EXISTS preferred_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS graduation_year INTEGER,
ADD COLUMN IF NOT EXISTS gpa DECIMAL(3,2),
ADD COLUMN IF NOT EXISTS academic_interests TEXT[],
ADD COLUMN IF NOT EXISTS career_interests TEXT[],
ADD COLUMN IF NOT EXISTS leadership_positions TEXT[],
ADD COLUMN IF NOT EXISTS community_service_hours INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS fca_events_attended TEXT[],
ADD COLUMN IF NOT EXISTS fca_events_interested TEXT[],
ADD COLUMN IF NOT EXISTS transportation_needs TEXT,
ADD COLUMN IF NOT EXISTS special_accommodations TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Enhance ministry_data table with more FCA-specific fields
ALTER TABLE ministry_data 
ADD COLUMN IF NOT EXISTS baptism_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS baptism_date DATE,
ADD COLUMN IF NOT EXISTS spiritual_maturity_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS prayer_partner VARCHAR(100),
ADD COLUMN IF NOT EXISTS accountability_partner VARCHAR(100),
ADD COLUMN IF NOT EXISTS bible_study_group VARCHAR(100),
ADD COLUMN IF NOT EXISTS worship_team_involvement BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS mission_trip_experience TEXT[],
ADD COLUMN IF NOT EXISTS mission_trip_interest TEXT[],
ADD COLUMN IF NOT EXISTS evangelism_training BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS discipleship_training BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS leadership_training BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS spiritual_gifts TEXT[],
ADD COLUMN IF NOT EXISTS personal_testimony TEXT,
ADD COLUMN IF NOT EXISTS family_faith_background TEXT,
ADD COLUMN IF NOT EXISTS prayer_requests TEXT,
ADD COLUMN IF NOT EXISTS spiritual_goals TEXT;

-- Enhance parents table with more comprehensive information
ALTER TABLE parents 
ADD COLUMN IF NOT EXISTS relationship_to_student VARCHAR(50),
ADD COLUMN IF NOT EXISTS is_legal_guardian BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS preferred_contact_method VARCHAR(20),
ADD COLUMN IF NOT EXISTS preferred_contact_time VARCHAR(50),
ADD COLUMN IF NOT EXISTS occupation VARCHAR(100),
ADD COLUMN IF NOT EXISTS employer VARCHAR(100),
ADD COLUMN IF NOT EXISTS church_affiliation VARCHAR(100),
ADD COLUMN IF NOT EXISTS fca_involvement BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS fca_role VARCHAR(100),
ADD COLUMN IF NOT EXISTS consent_for_communications BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS consent_for_photos BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS consent_for_social_media BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS consent_for_medical_treatment BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS insurance_provider VARCHAR(100),
ADD COLUMN IF NOT EXISTS insurance_policy_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS insurance_group_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS primary_care_physician VARCHAR(100),
ADD COLUMN IF NOT EXISTS physician_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS physician_address TEXT;

-- Create a new table for FCA events and activities
CREATE TABLE IF NOT EXISTS fca_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  event_type VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  location VARCHAR(200),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
  state_id UUID REFERENCES states(id) ON DELETE CASCADE,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  registration_deadline DATE,
  cost DECIMAL(10,2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a table for student event registrations
CREATE TABLE IF NOT EXISTS student_event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES fca_events(id) ON DELETE CASCADE,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'REGISTERED',
  payment_status VARCHAR(50) DEFAULT 'PENDING',
  special_requests TEXT,
  dietary_restrictions TEXT,
  transportation_needs TEXT,
  emergency_contact_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, event_id)
);

-- Create a table for student achievements and awards
CREATE TABLE IF NOT EXISTS student_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  achievement_type VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date_earned DATE NOT NULL,
  awarded_by VARCHAR(100),
  certificate_url TEXT,
  points_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a table for student attendance tracking
CREATE TABLE IF NOT EXISTS student_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  huddle_id UUID NOT NULL REFERENCES huddles(id) ON DELETE CASCADE,
  meeting_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'PRESENT',
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  notes TEXT,
  recorded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a table for student small groups or discipleship groups
CREATE TABLE IF NOT EXISTS discipleship_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  huddle_id UUID NOT NULL REFERENCES huddles(id) ON DELETE CASCADE,
  leader_student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  leader_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  meeting_time VARCHAR(100),
  meeting_location VARCHAR(200),
  max_members INTEGER,
  current_members INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a junction table for student group memberships
CREATE TABLE IF NOT EXISTS student_group_memberships (
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES discipleship_groups(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'MEMBER',
  joined_date TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (student_id, group_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_students_profile_picture ON students(profile_picture_url);
CREATE INDEX IF NOT EXISTS idx_students_graduation_year ON students(graduation_year);
CREATE INDEX IF NOT EXISTS idx_students_gpa ON students(gpa);
CREATE INDEX IF NOT EXISTS idx_fca_events_school_id ON fca_events(school_id);
CREATE INDEX IF NOT EXISTS idx_fca_events_region_id ON fca_events(region_id);
CREATE INDEX IF NOT EXISTS idx_fca_events_state_id ON fca_events(state_id);
CREATE INDEX IF NOT EXISTS idx_fca_events_start_date ON fca_events(start_date);
CREATE INDEX IF NOT EXISTS idx_student_event_registrations_student_id ON student_event_registrations(student_id);
CREATE INDEX IF NOT EXISTS idx_student_event_registrations_event_id ON student_event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_student_achievements_student_id ON student_achievements(student_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_student_id ON student_attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_huddle_id ON student_attendance(huddle_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_meeting_date ON student_attendance(meeting_date);
CREATE INDEX IF NOT EXISTS idx_discipleship_groups_huddle_id ON discipleship_groups(huddle_id);
CREATE INDEX IF NOT EXISTS idx_student_group_memberships_student_id ON student_group_memberships(student_id);
CREATE INDEX IF NOT EXISTS idx_student_group_memberships_group_id ON student_group_memberships(group_id);

-- Enable RLS on new tables
ALTER TABLE fca_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE discipleship_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_group_memberships ENABLE ROW LEVEL SECURITY;

-- RLS Policies for new tables
CREATE POLICY "Students can view events in their school/region/state" ON fca_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s
      JOIN schools sch ON s.school_id = sch.id
      WHERE s.user_id = auth.uid() AND (
        (fca_events.school_id = sch.id) OR
        (fca_events.region_id = sch.region_id) OR
        (fca_events.state_id = (
          SELECT state_id FROM regions WHERE id = sch.region_id
        ))
      )
    )
  );

CREATE POLICY "Students can view their own event registrations" ON student_event_registrations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s WHERE s.user_id = auth.uid() AND s.id = student_event_registrations.student_id
    )
  );

CREATE POLICY "Students can view their own achievements" ON student_achievements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s WHERE s.user_id = auth.uid() AND s.id = student_achievements.student_id
    )
  );

CREATE POLICY "Students can view their own attendance" ON student_attendance
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s WHERE s.user_id = auth.uid() AND s.id = student_attendance.student_id
    )
  );

CREATE POLICY "Students can view groups in their huddle" ON discipleship_groups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s
      JOIN huddles h ON s.school_id = h.school_id
      WHERE s.user_id = auth.uid() AND h.id = discipleship_groups.huddle_id
    )
  );

CREATE POLICY "Students can view their group memberships" ON student_group_memberships
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s WHERE s.user_id = auth.uid() AND s.id = student_group_memberships.student_id
    )
  );

-- Insert some default FCA event types
INSERT INTO fca_events (name, description, event_type, start_date, end_date, location, state_id) VALUES
  ('FCA Leadership Camp', 'Annual leadership development camp for FCA student leaders', 'CAMP', '2024-06-15', '2024-06-20', 'Camp Location TBD', (SELECT id FROM states WHERE code = 'IL')),
  ('FCA State Conference', 'Statewide FCA conference with worship, speakers, and workshops', 'CONFERENCE', '2024-03-15', '2024-03-16', 'State Convention Center', (SELECT id FROM states WHERE code = 'IL')),
  ('FCA Regional Rally', 'Regional gathering for FCA students and leaders', 'RALLY', '2024-04-20', '2024-04-20', 'Regional Location TBD', (SELECT id FROM states WHERE code = 'IL')),
  ('FCA Sports Camp', 'Sports-focused camp combining athletics and faith', 'CAMP', '2024-07-10', '2024-07-15', 'Sports Complex TBD', (SELECT id FROM states WHERE code = 'IL')),
  ('FCA Prayer Breakfast', 'Monthly prayer breakfast for FCA community', 'PRAYER', '2024-02-01', '2024-02-01', 'Local Church', (SELECT id FROM states WHERE code = 'IL'))
ON CONFLICT DO NOTHING;

-- Create function to calculate student's FCA points
CREATE OR REPLACE FUNCTION calculate_fca_points(student_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  total_points INTEGER := 0;
BEGIN
  -- Points from achievements
  SELECT COALESCE(SUM(points_awarded), 0) INTO total_points
  FROM student_achievements
  WHERE student_id = student_uuid;
  
  -- Points from attendance (1 point per meeting)
  SELECT total_points + COALESCE(COUNT(*), 0) INTO total_points
  FROM student_attendance
  WHERE student_id = student_uuid AND status = 'PRESENT';
  
  -- Points from community service (1 point per hour)
  SELECT total_points + COALESCE(community_service_hours, 0) INTO total_points
  FROM students
  WHERE id = student_uuid;
  
  RETURN total_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get student's FCA statistics
CREATE OR REPLACE FUNCTION get_fca_statistics(student_uuid UUID)
RETURNS TABLE(
  total_points INTEGER,
  meetings_attended INTEGER,
  events_registered INTEGER,
  achievements_count INTEGER,
  community_service_hours INTEGER,
  leadership_positions_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    calculate_fca_points(student_uuid) as total_points,
    COALESCE(COUNT(sa.id), 0) as meetings_attended,
    COALESCE(COUNT(ser.id), 0) as events_registered,
    COALESCE(COUNT(ach.id), 0) as achievements_count,
    COALESCE(s.community_service_hours, 0) as community_service_hours,
    COALESCE(array_length(s.leadership_positions, 1), 0) as leadership_positions_count
  FROM students s
  LEFT JOIN student_attendance sa ON s.id = sa.student_id AND sa.status = 'PRESENT'
  LEFT JOIN student_event_registrations ser ON s.id = ser.student_id
  LEFT JOIN student_achievements ach ON s.id = ach.student_id
  WHERE s.id = student_uuid
  GROUP BY s.id, s.community_service_hours, s.leadership_positions;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
