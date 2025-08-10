export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'STUDENT' | 'SCHOOL' | 'REGION' | 'STATE' | 'SUPER'
          status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: 'STUDENT' | 'SCHOOL' | 'REGION' | 'STATE' | 'SUPER'
          status?: 'ACTIVE' | 'INACTIVE' | 'PENDING'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'STUDENT' | 'SCHOOL' | 'REGION' | 'STATE' | 'SUPER'
          status?: 'ACTIVE' | 'INACTIVE' | 'PENDING'
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          user_id: string | null
          school_id: string
          first_name: string
          last_name: string
          email: string | null
          mobile: string | null
          grade: string | null
          shirt_size: string | null
          socials_instagram: string | null
          socials_snap: string | null
          socials_tiktok: string | null
          address: any | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          school_id: string
          first_name: string
          last_name: string
          email?: string | null
          mobile?: string | null
          grade?: string | null
          shirt_size?: string | null
          socials_instagram?: string | null
          socials_snap?: string | null
          socials_tiktok?: string | null
          address?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          school_id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          mobile?: string | null
          grade?: string | null
          shirt_size?: string | null
          socials_instagram?: string | null
          socials_snap?: string | null
          socials_tiktok?: string | null
          address?: any | null
          created_at?: string
        }
      }
      parents: {
        Row: {
          id: string
          student_id: string
          name1: string
          name2: string | null
          phone: string
          email: string
          address: any | null
          workplace: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          name1: string
          name2?: string | null
          phone: string
          email: string
          address?: any | null
          workplace?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          name1?: string
          name2?: string | null
          phone?: string
          email?: string
          address?: any | null
          workplace?: string | null
          created_at?: string
        }
      }
      consents: {
        Row: {
          id: string
          student_id: string
          parent_email: string
          method: 'EMAIL' | 'SMS'
          status: 'PENDING' | 'VERIFIED' | 'DECLINED'
          token: string
          timestamp: string
          ip: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          parent_email: string
          method?: 'EMAIL' | 'SMS'
          status?: 'PENDING' | 'VERIFIED' | 'DECLINED'
          token: string
          timestamp?: string
          ip?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          parent_email?: string
          method?: 'EMAIL' | 'SMS'
          status?: 'PENDING' | 'VERIFIED' | 'DECLINED'
          token?: string
          timestamp?: string
          ip?: string | null
          created_at?: string
        }
      }
      ministry_data: {
        Row: {
          id: string
          student_id: string
          church_name: string | null
          relationship: 'YES' | 'NO' | 'INTERESTED' | null
          owns_bible: boolean | null
          camp_attended: boolean | null
          camp_interest: boolean | null
          leadership_interest: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          church_name?: string | null
          relationship?: 'YES' | 'NO' | 'INTERESTED' | null
          owns_bible?: boolean | null
          camp_attended?: boolean | null
          camp_interest?: boolean | null
          leadership_interest?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          church_name?: string | null
          relationship?: 'YES' | 'NO' | 'INTERESTED' | null
          owns_bible?: boolean | null
          camp_attended?: boolean | null
          camp_interest?: boolean | null
          leadership_interest?: boolean | null
          created_at?: string
        }
      }
      schools: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          region_id: string
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          region_id: string
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          region_id?: string
          active?: boolean
          created_at?: string
        }
      }
      huddles: {
        Row: {
          id: string
          school_id: string
          name: string
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          school_id: string
          name: string
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          school_id?: string
          name?: string
          active?: boolean
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          huddle_id: string
          student_id: string
          status: 'PENDING' | 'APPROVED' | 'DECLINED'
          created_at: string
        }
        Insert: {
          id?: string
          huddle_id: string
          student_id: string
          status?: 'PENDING' | 'APPROVED' | 'DECLINED'
          created_at?: string
        }
        Update: {
          id?: string
          huddle_id?: string
          student_id?: string
          status?: 'PENDING' | 'APPROVED' | 'DECLINED'
          created_at?: string
        }
      }
      regions: {
        Row: {
          id: string
          name: string
          state_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          state_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          state_id?: string
          created_at?: string
        }
      }
      states: {
        Row: {
          id: string
          code: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          created_at?: string
        }
      }
      role_assignments: {
        Row: {
          id: string
          user_id: string
          role: 'SUPER' | 'STATE' | 'REGION' | 'SCHOOL'
          scope_type: 'STATE' | 'REGION' | 'SCHOOL'
          scope_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'SUPER' | 'STATE' | 'REGION' | 'SCHOOL'
          scope_type: 'STATE' | 'REGION' | 'SCHOOL'
          scope_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'SUPER' | 'STATE' | 'REGION' | 'SCHOOL'
          scope_type?: 'STATE' | 'REGION' | 'SCHOOL'
          scope_id?: string
          created_at?: string
        }
      }
      message_threads: {
        Row: {
          id: string
          school_id: string
          student_id: string
          subject: string | null
          created_by_user_id: string
          visibility_scope: 'SCHOOL' | 'REGION' | 'STATE'
          status: 'OPEN' | 'CLOSED'
          last_message_at: string
          created_at: string
        }
        Insert: {
          id?: string
          school_id: string
          student_id: string
          subject?: string | null
          created_by_user_id: string
          visibility_scope?: 'SCHOOL' | 'REGION' | 'STATE'
          status?: 'OPEN' | 'CLOSED'
          last_message_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          school_id?: string
          student_id?: string
          subject?: string | null
          created_by_user_id?: string
          visibility_scope?: 'SCHOOL' | 'REGION' | 'STATE'
          status?: 'OPEN' | 'CLOSED'
          last_message_at?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          thread_id: string
          sender_user_id: string
          body: string
          created_at: string
          edited_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          thread_id: string
          sender_user_id: string
          body: string
          created_at?: string
          edited_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          thread_id?: string
          sender_user_id?: string
          body?: string
          created_at?: string
          edited_at?: string | null
          deleted_at?: string | null
        }
      }
      thread_participants: {
        Row: {
          thread_id: string
          user_id: string
          role: string | null
          muted: boolean
          joined_at: string
        }
        Insert: {
          thread_id: string
          user_id: string
          role?: string | null
          muted?: boolean
          joined_at?: string
        }
        Update: {
          thread_id?: string
          user_id?: string
          role?: string | null
          muted?: boolean
          joined_at?: string
        }
      }
      sports: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      student_sports: {
        Row: {
          student_id: string
          sport_id: string
          created_at: string
        }
        Insert: {
          student_id: string
          sport_id: string
          created_at?: string
        }
        Update: {
          student_id?: string
          sport_id?: string
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

