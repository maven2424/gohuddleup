export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'ADMIN' | 'STUDENT' | 'COACH' | 'TEACHER'
          status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'ADMIN' | 'STUDENT' | 'COACH' | 'TEACHER'
          status?: 'ACTIVE' | 'INACTIVE' | 'PENDING'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'ADMIN' | 'STUDENT' | 'COACH' | 'TEACHER'
          status?: 'ACTIVE' | 'INACTIVE' | 'PENDING'
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          mobile: string
          grade: string
          shirt_size: string
          school_id: string
          profile_picture_url?: string
          socials_instagram?: string
          socials_snap?: string
          socials_tiktok?: string
          address?: {
            street?: string
            city?: string
            state?: string
            zip?: string
          }
          // Enhanced FCA fields
          date_of_birth?: string
          gender?: string
          emergency_contact_name?: string
          emergency_contact_phone?: string
          emergency_contact_relationship?: string
          medical_conditions?: string
          allergies?: string
          dietary_restrictions?: string
          t_shirt_size?: string
          hoodie_size?: string
          preferred_name?: string
          graduation_year?: number
          gpa?: number
          academic_interests?: string[]
          career_interests?: string[]
          leadership_positions?: string[]
          community_service_hours?: number
          fca_events_attended?: string[]
          fca_events_interested?: string[]
          transportation_needs?: string
          special_accommodations?: string
          notes?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          mobile: string
          grade: string
          shirt_size: string
          school_id: string
          profile_picture_url?: string
          socials_instagram?: string
          socials_snap?: string
          socials_tiktok?: string
          address?: {
            street?: string
            city?: string
            state?: string
            zip?: string
          }
          // Enhanced FCA fields
          date_of_birth?: string
          gender?: string
          emergency_contact_name?: string
          emergency_contact_phone?: string
          emergency_contact_relationship?: string
          medical_conditions?: string
          allergies?: string
          dietary_restrictions?: string
          t_shirt_size?: string
          hoodie_size?: string
          preferred_name?: string
          graduation_year?: number
          gpa?: number
          academic_interests?: string[]
          career_interests?: string[]
          leadership_positions?: string[]
          community_service_hours?: number
          fca_events_attended?: string[]
          fca_events_interested?: string[]
          transportation_needs?: string
          special_accommodations?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          email?: string
          mobile?: string
          grade?: string
          shirt_size?: string
          school_id?: string
          profile_picture_url?: string
          socials_instagram?: string
          socials_snap?: string
          socials_tiktok?: string
          address?: {
            street?: string
            city?: string
            state?: string
            zip?: string
          }
          // Enhanced FCA fields
          date_of_birth?: string
          gender?: string
          emergency_contact_name?: string
          emergency_contact_phone?: string
          emergency_contact_relationship?: string
          medical_conditions?: string
          allergies?: string
          dietary_restrictions?: string
          t_shirt_size?: string
          hoodie_size?: string
          preferred_name?: string
          graduation_year?: number
          gpa?: number
          academic_interests?: string[]
          career_interests?: string[]
          leadership_positions?: string[]
          community_service_hours?: number
          fca_events_attended?: string[]
          fca_events_interested?: string[]
          transportation_needs?: string
          special_accommodations?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      schools: {
        Row: {
          id: string
          name: string
          region_id: string
          state_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          region_id: string
          state_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          region_id?: string
          state_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      huddles: {
        Row: {
          id: string
          name: string
          school_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          school_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          school_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      regions: {
        Row: {
          id: string
          name: string
          state_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          state_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          state_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      states: {
        Row: {
          id: string
          name: string
          code: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          created_at?: string
          updated_at?: string
        }
      }
      ministry_data: {
        Row: {
          id: string
          student_id: string
          church_name: string
          relationship_to_christ: string
          owns_bible: boolean
          camp_attended: boolean
          camp_interest: boolean
          leadership_interest: boolean
          // Enhanced FCA fields
          baptism_status?: string
          baptism_date?: string
          spiritual_maturity_level?: string
          prayer_partner?: string
          accountability_partner?: string
          bible_study_group?: string
          worship_team_involvement?: boolean
          mission_trip_experience?: string[]
          mission_trip_interest?: string[]
          evangelism_training?: boolean
          discipleship_training?: boolean
          leadership_training?: boolean
          spiritual_gifts?: string[]
          personal_testimony?: string
          family_faith_background?: string
          prayer_requests?: string
          spiritual_goals?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          church_name: string
          relationship_to_christ: string
          owns_bible: boolean
          camp_attended: boolean
          camp_interest: boolean
          leadership_interest: boolean
          // Enhanced FCA fields
          baptism_status?: string
          baptism_date?: string
          spiritual_maturity_level?: string
          prayer_partner?: string
          accountability_partner?: string
          bible_study_group?: string
          worship_team_involvement?: boolean
          mission_trip_experience?: string[]
          mission_trip_interest?: string[]
          evangelism_training?: boolean
          discipleship_training?: boolean
          leadership_training?: boolean
          spiritual_gifts?: string[]
          personal_testimony?: string
          family_faith_background?: string
          prayer_requests?: string
          spiritual_goals?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          church_name?: string
          relationship_to_christ?: string
          owns_bible?: boolean
          camp_attended?: boolean
          camp_interest?: boolean
          leadership_interest?: boolean
          // Enhanced FCA fields
          baptism_status?: string
          baptism_date?: string
          spiritual_maturity_level?: string
          prayer_partner?: string
          accountability_partner?: string
          bible_study_group?: string
          worship_team_involvement?: boolean
          mission_trip_experience?: string[]
          mission_trip_interest?: string[]
          evangelism_training?: boolean
          discipleship_training?: boolean
          leadership_training?: boolean
          spiritual_gifts?: string[]
          personal_testimony?: string
          family_faith_background?: string
          prayer_requests?: string
          spiritual_goals?: string
          created_at?: string
          updated_at?: string
        }
      }
      parents: {
        Row: {
          id: string
          student_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          // Enhanced FCA fields
          relationship_to_student?: string
          is_legal_guardian?: boolean
          preferred_contact_method?: string
          preferred_contact_time?: string
          occupation?: string
          employer?: string
          church_affiliation?: string
          fca_involvement?: boolean
          fca_role?: string
          consent_for_communications?: boolean
          consent_for_photos?: boolean
          consent_for_social_media?: boolean
          consent_for_medical_treatment?: boolean
          insurance_provider?: string
          insurance_policy_number?: string
          insurance_group_number?: string
          primary_care_physician?: string
          physician_phone?: string
          physician_address?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          // Enhanced FCA fields
          relationship_to_student?: string
          is_legal_guardian?: boolean
          preferred_contact_method?: string
          preferred_contact_time?: string
          occupation?: string
          employer?: string
          church_affiliation?: string
          fca_involvement?: boolean
          fca_role?: string
          consent_for_communications?: boolean
          consent_for_photos?: boolean
          consent_for_social_media?: boolean
          consent_for_medical_treatment?: boolean
          insurance_provider?: string
          insurance_policy_number?: string
          insurance_group_number?: string
          primary_care_physician?: string
          physician_phone?: string
          physician_address?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          // Enhanced FCA fields
          relationship_to_student?: string
          is_legal_guardian?: boolean
          preferred_contact_method?: string
          preferred_contact_time?: string
          occupation?: string
          employer?: string
          church_affiliation?: string
          fca_involvement?: boolean
          fca_role?: string
          consent_for_communications?: boolean
          consent_for_photos?: boolean
          consent_for_social_media?: boolean
          consent_for_medical_treatment?: boolean
          insurance_provider?: string
          insurance_policy_number?: string
          insurance_group_number?: string
          primary_care_physician?: string
          physician_phone?: string
          physician_address?: string
          created_at?: string
          updated_at?: string
        }
      }
      // New FCA tables
      fca_events: {
        Row: {
          id: string
          name: string
          description?: string
          event_type: string
          start_date: string
          end_date?: string
          location?: string
          school_id?: string
          region_id?: string
          state_id?: string
          max_participants?: number
          current_participants: number
          registration_deadline?: string
          cost: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          event_type: string
          start_date: string
          end_date?: string
          location?: string
          school_id?: string
          region_id?: string
          state_id?: string
          max_participants?: number
          current_participants?: number
          registration_deadline?: string
          cost?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          event_type?: string
          start_date?: string
          end_date?: string
          location?: string
          school_id?: string
          region_id?: string
          state_id?: string
          max_participants?: number
          current_participants?: number
          registration_deadline?: string
          cost?: number
          is_active?: boolean
          created_at?: string
        }
      }
      student_event_registrations: {
        Row: {
          id: string
          student_id: string
          event_id: string
          registration_date: string
          status: string
          payment_status: string
          special_requests?: string
          dietary_restrictions?: string
          transportation_needs?: string
          emergency_contact_info?: string
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          event_id: string
          registration_date?: string
          status?: string
          payment_status?: string
          special_requests?: string
          dietary_restrictions?: string
          transportation_needs?: string
          emergency_contact_info?: string
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          event_id?: string
          registration_date?: string
          status?: string
          payment_status?: string
          special_requests?: string
          dietary_restrictions?: string
          transportation_needs?: string
          emergency_contact_info?: string
          created_at?: string
        }
      }
      student_achievements: {
        Row: {
          id: string
          student_id: string
          achievement_type: string
          title: string
          description?: string
          date_earned: string
          awarded_by?: string
          certificate_url?: string
          points_awarded: number
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          achievement_type: string
          title: string
          description?: string
          date_earned: string
          awarded_by?: string
          certificate_url?: string
          points_awarded?: number
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          achievement_type?: string
          title?: string
          description?: string
          date_earned?: string
          awarded_by?: string
          certificate_url?: string
          points_awarded?: number
          created_at?: string
        }
      }
      student_attendance: {
        Row: {
          id: string
          student_id: string
          huddle_id: string
          meeting_date: string
          status: string
          check_in_time?: string
          check_out_time?: string
          notes?: string
          recorded_by?: string
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          huddle_id: string
          meeting_date: string
          status?: string
          check_in_time?: string
          check_out_time?: string
          notes?: string
          recorded_by?: string
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          huddle_id?: string
          meeting_date?: string
          status?: string
          check_in_time?: string
          check_out_time?: string
          notes?: string
          recorded_by?: string
          created_at?: string
        }
      }
      discipleship_groups: {
        Row: {
          id: string
          name: string
          description?: string
          huddle_id: string
          leader_student_id?: string
          leader_user_id?: string
          meeting_time?: string
          meeting_location?: string
          max_members?: number
          current_members: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          huddle_id: string
          leader_student_id?: string
          leader_user_id?: string
          meeting_time?: string
          meeting_location?: string
          max_members?: number
          current_members?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          huddle_id?: string
          leader_student_id?: string
          leader_user_id?: string
          meeting_time?: string
          meeting_location?: string
          max_members?: number
          current_members?: number
          is_active?: boolean
          created_at?: string
        }
      }
      student_group_memberships: {
        Row: {
          student_id: string
          group_id: string
          role: string
          joined_date: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          student_id: string
          group_id: string
          role?: string
          joined_date?: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          student_id?: string
          group_id?: string
          role?: string
          joined_date?: string
          is_active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_fca_points: {
        Args: {
          student_uuid: string
        }
        Returns: number
      }
      get_fca_statistics: {
        Args: {
          student_uuid: string
        }
        Returns: {
          total_points: number
          meetings_attended: number
          events_registered: number
          achievements_count: number
          community_service_hours: number
          leadership_positions_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

