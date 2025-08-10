-- goHuddleUp Database Schema
-- This file contains all the SQL needed to set up the database in Supabase

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('STUDENT', 'SCHOOL', 'REGION', 'STATE', 'SUPER');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');
CREATE TYPE consent_status AS ENUM ('PENDING', 'VERIFIED', 'DECLINED');
CREATE TYPE consent_method AS ENUM ('EMAIL', 'SMS');
CREATE TYPE enrollment_status AS ENUM ('PENDING', 'APPROVED', 'DECLINED');
CREATE TYPE thread_status AS ENUM ('OPEN', 'CLOSED');
CREATE TYPE visibility_scope AS ENUM ('SCHOOL', 'REGION', 'STATE');
CREATE TYPE scope_type AS ENUM ('STATE', 'REGION', 'SCHOOL');

-- States table
CREATE TABLE states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(2) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Regions table
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  state_id UUID NOT NULL REFERENCES states(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schools table
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Huddles table
CREATE TABLE huddles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  role user_role DEFAULT 'STUDENT',
  status user_status DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role assignments table for RBAC
CREATE TABLE role_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  scope_type scope_type NOT NULL,
  scope_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role, scope_type, scope_id)
);

-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  mobile VARCHAR(20),
  grade VARCHAR(20),
  shirt_size VARCHAR(10),
  socials_instagram VARCHAR(100),
  socials_snap VARCHAR(100),
  socials_tiktok VARCHAR(100),
  address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Parents table
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  name1 VARCHAR(100) NOT NULL,
  name2 VARCHAR(100),
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address JSONB,
  workplace VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Consents table
CREATE TABLE consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  parent_email VARCHAR(255) NOT NULL,
  method consent_method DEFAULT 'EMAIL',
  status consent_status DEFAULT 'PENDING',
  token VARCHAR(255) NOT NULL UNIQUE,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  ip INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ministry data table
CREATE TABLE ministry_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  church_name VARCHAR(200),
  relationship VARCHAR(20) CHECK (relationship IN ('YES', 'NO', 'INTERESTED')),
  owns_bible BOOLEAN,
  camp_attended BOOLEAN,
  camp_interest BOOLEAN,
  leadership_interest BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sports table
CREATE TABLE sports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student sports junction table
CREATE TABLE student_sports (
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  sport_id UUID NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (student_id, sport_id)
);

-- Enrollments table
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  huddle_id UUID NOT NULL REFERENCES huddles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status enrollment_status DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(huddle_id, student_id)
);

-- Message threads table
CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject VARCHAR(200),
  created_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  visibility_scope visibility_scope DEFAULT 'SCHOOL',
  status thread_status DEFAULT 'OPEN',
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Thread participants table
CREATE TABLE thread_participants (
  thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50),
  muted BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (thread_id, user_id)
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- Attachments table
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255),
  mime VARCHAR(100),
  size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Message flags table
CREATE TABLE message_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  flag_type VARCHAR(50) NOT NULL,
  flagged_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  flagged_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolver_user_id UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Audit logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  before JSONB,
  after JSONB,
  at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default sports
INSERT INTO sports (name) VALUES 
  ('Baseball'),
  ('Basketball'),
  ('Cross Country'),
  ('Football'),
  ('Golf'),
  ('Lacrosse'),
  ('Soccer'),
  ('Softball'),
  ('Swimming'),
  ('Tennis'),
  ('Track & Field'),
  ('Volleyball'),
  ('Wrestling'),
  ('Other');

-- Insert default states
INSERT INTO states (code, name) VALUES
  ('AL', 'Alabama'), ('AK', 'Alaska'), ('AZ', 'Arizona'), ('AR', 'Arkansas'),
  ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DE', 'Delaware'),
  ('FL', 'Florida'), ('GA', 'Georgia'), ('HI', 'Hawaii'), ('ID', 'Idaho'),
  ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'), ('KS', 'Kansas'),
  ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('ME', 'Maine'), ('MD', 'Maryland'),
  ('MA', 'Massachusetts'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MS', 'Mississippi'),
  ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'), ('NV', 'Nevada'),
  ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NY', 'New York'),
  ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('OH', 'Ohio'), ('OK', 'Oklahoma'),
  ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'),
  ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'),
  ('VT', 'Vermont'), ('VA', 'Virginia'), ('WA', 'Washington'), ('WV', 'West Virginia'),
  ('WI', 'Wisconsin'), ('WY', 'Wyoming');

-- Create indexes for performance
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_parents_student_id ON parents(student_id);
CREATE INDEX idx_consents_student_id ON consents(student_id);
CREATE INDEX idx_consents_token ON consents(token);
CREATE INDEX idx_consents_status ON consents(status);
CREATE INDEX idx_ministry_data_student_id ON ministry_data(student_id);
CREATE INDEX idx_enrollments_huddle_id ON enrollments(huddle_id);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_role_assignments_user_id ON role_assignments(user_id);
CREATE INDEX idx_role_assignments_scope ON role_assignments(scope_type, scope_id);
CREATE INDEX idx_message_threads_school_id ON message_threads(school_id);
CREATE INDEX idx_message_threads_student_id ON message_threads(student_id);
CREATE INDEX idx_messages_thread_id ON messages(thread_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE ministry_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE huddles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE thread_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admins can view all users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM role_assignments ra
      WHERE ra.user_id = auth.uid() AND ra.role = 'SUPER'
    )
  );

-- Students policies
CREATE POLICY "Students can view their own data" ON students
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "School admins can view students in their school" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM role_assignments ra
      JOIN schools s ON ra.scope_id = s.id
      WHERE ra.user_id = auth.uid() 
      AND ra.role = 'SCHOOL' 
      AND ra.scope_type = 'SCHOOL'
      AND s.id = students.school_id
    )
  );

CREATE POLICY "Regional admins can view students in their region" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM role_assignments ra
      JOIN schools s ON ra.scope_id = s.region_id
      WHERE ra.user_id = auth.uid() 
      AND ra.role = 'REGION' 
      AND ra.scope_type = 'REGION'
      AND s.id = students.school_id
    )
  );

CREATE POLICY "State admins can view students in their state" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM role_assignments ra
      JOIN schools s ON ra.scope_id = s.region_id
      JOIN regions r ON s.region_id = r.id
      WHERE ra.user_id = auth.uid() 
      AND ra.role = 'STATE' 
      AND ra.scope_type = 'STATE'
      AND r.state_id = ra.scope_id
    )
  );

-- Ministry data policies (more restrictive)
CREATE POLICY "School admins can view ministry data in their school" ON ministry_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM role_assignments ra
      JOIN students st ON ministry_data.student_id = st.id
      JOIN schools s ON ra.scope_id = s.id
      WHERE ra.user_id = auth.uid() 
      AND ra.role = 'SCHOOL' 
      AND ra.scope_type = 'SCHOOL'
      AND s.id = st.school_id
    )
  );

CREATE POLICY "Regional admins can view ministry data in their region" ON ministry_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM role_assignments ra
      JOIN students st ON ministry_data.student_id = st.id
      JOIN schools s ON ra.scope_id = s.region_id
      WHERE ra.user_id = auth.uid() 
      AND ra.role = 'REGION' 
      AND ra.scope_type = 'REGION'
      AND s.id = st.school_id
    )
  );

-- Message threads policies
CREATE POLICY "Users can view threads they participate in" ON message_threads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM thread_participants tp
      WHERE tp.thread_id = message_threads.id AND tp.user_id = auth.uid()
    )
  );

CREATE POLICY "School admins can view threads in their school" ON message_threads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM role_assignments ra
      WHERE ra.user_id = auth.uid() 
      AND ra.role = 'SCHOOL' 
      AND ra.scope_type = 'SCHOOL'
      AND ra.scope_id = message_threads.school_id
    )
  );

-- Messages policies
CREATE POLICY "Users can view messages in threads they participate in" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM thread_participants tp
      WHERE tp.thread_id = messages.thread_id AND tp.user_id = auth.uid()
    )
  );

-- Functions for common operations

-- Function to get user's scope
CREATE OR REPLACE FUNCTION get_user_scope(user_uuid UUID)
RETURNS TABLE(role user_role, scope_type scope_type, scope_id UUID) AS $$
BEGIN
  RETURN QUERY
  SELECT ra.role, ra.scope_type, ra.scope_id
  FROM role_assignments ra
  WHERE ra.user_id = user_uuid
  ORDER BY 
    CASE ra.role 
      WHEN 'SUPER' THEN 1
      WHEN 'STATE' THEN 2
      WHEN 'REGION' THEN 3
      WHEN 'SCHOOL' THEN 4
      ELSE 5
    END
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has permission
CREATE OR REPLACE FUNCTION has_permission(
  user_uuid UUID,
  required_role user_role,
  target_scope_type scope_type,
  target_scope_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  user_scope RECORD;
BEGIN
  SELECT * INTO user_scope FROM get_user_scope(user_uuid);
  
  -- Super admins have all permissions
  IF user_scope.role = 'SUPER' THEN
    RETURN TRUE;
  END IF;
  
  -- Check role hierarchy
  IF user_scope.role = required_role AND user_scope.scope_type = target_scope_type AND user_scope.scope_id = target_scope_id THEN
    RETURN TRUE;
  END IF;
  
  -- State admins can access anything in their state
  IF user_scope.role = 'STATE' AND target_scope_type = 'REGION' THEN
    RETURN EXISTS (
      SELECT 1 FROM regions r
      WHERE r.id = target_scope_id AND r.state_id = user_scope.scope_id
    );
  END IF;
  
  IF user_scope.role = 'STATE' AND target_scope_type = 'SCHOOL' THEN
    RETURN EXISTS (
      SELECT 1 FROM schools s
      JOIN regions r ON s.region_id = r.id
      WHERE s.id = target_scope_id AND r.state_id = user_scope.scope_id
    );
  END IF;
  
  -- Regional admins can access anything in their region
  IF user_scope.role = 'REGION' AND target_scope_type = 'SCHOOL' THEN
    RETURN EXISTS (
      SELECT 1 FROM schools s
      WHERE s.id = target_scope_id AND s.region_id = user_scope.scope_id
    );
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create audit log entry
CREATE OR REPLACE FUNCTION create_audit_log(
  action_name VARCHAR(100),
  entity_type_name VARCHAR(50),
  entity_uuid UUID,
  before_data JSONB DEFAULT NULL,
  after_data JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO audit_logs (actor_user_id, action, entity_type, entity_id, before, after)
  VALUES (auth.uid(), action_name, entity_type_name, entity_uuid, before_data, after_data);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM create_audit_log('CREATE', TG_TABLE_NAME, NEW.id, NULL, to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM create_audit_log('UPDATE', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM create_audit_log('DELETE', TG_TABLE_NAME, OLD.id, to_jsonb(OLD), NULL);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create audit triggers for important tables
CREATE TRIGGER audit_students_trigger
  AFTER INSERT OR UPDATE OR DELETE ON students
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_consents_trigger
  AFTER INSERT OR UPDATE OR DELETE ON consents
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_enrollments_trigger
  AFTER INSERT OR UPDATE OR DELETE ON enrollments
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Function to update last_message_at when new message is added
CREATE OR REPLACE FUNCTION update_thread_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE message_threads 
  SET last_message_at = NOW()
  WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_thread_last_message_trigger
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_thread_last_message();
