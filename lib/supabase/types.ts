export interface Database {
  public: {
    Tables: {
      cms_data: {
        Row: {
          id: string
          data: any
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          data: any
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          data?: any
          updated_at?: string
          updated_by?: string | null
        }
      }
      cms_activity_log: {
        Row: {
          id: string
          user_id: string | null
          action: string
          section: string
          description: string | null
          old_data: any
          new_data: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          section: string
          description?: string | null
          old_data?: any
          new_data?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          section?: string
          description?: string | null
          old_data?: any
          new_data?: any
          created_at?: string
        }
      }
    }
  }
}

export interface ActivityLogEntry {
  id: string
  user_id: string | null
  action: string
  section: string
  description: string | null
  old_data: any
  new_data: any
  created_at: string
  user_email?: string
}
