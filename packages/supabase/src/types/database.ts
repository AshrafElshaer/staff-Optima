export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      application_stage_triggers: {
        Row: {
          action_data: Json;
          action_type: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          stage_id: string | null;
          trigger_condition: string;
          updated_at: string;
        };
        Insert: {
          action_data: Json;
          action_type: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          stage_id?: string | null;
          trigger_condition: string;
          updated_at?: string;
        };
        Update: {
          action_data?: Json;
          action_type?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          stage_id?: string | null;
          trigger_condition?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "application_stage_triggers_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "application_stage_triggers_stage_id_fkey";
            columns: ["stage_id"];
            isOneToOne: false;
            referencedRelation: "application_stages";
            referencedColumns: ["id"];
          },
        ];
      };
      application_stages: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          indicator_color: string;
          organization_id: string | null;
          stage_order: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          indicator_color: string;
          organization_id?: string | null;
          stage_order: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          indicator_color?: string;
          organization_id?: string | null;
          stage_order?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "application_stages_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      applications: {
        Row: {
          candidate_id: string;
          candidate_match: number;
          created_at: string;
          department_id: string | null;
          id: string;
          job_id: string;
          organization_id: string;
          rejection_reason_id: string | null;
          screening_question_answers: Json | null;
          source: string | null;
          stage_id: string | null;
          updated_at: string;
        };
        Insert: {
          candidate_id: string;
          candidate_match: number;
          created_at?: string;
          department_id?: string | null;
          id?: string;
          job_id: string;
          organization_id: string;
          rejection_reason_id?: string | null;
          screening_question_answers?: Json | null;
          source?: string | null;
          stage_id?: string | null;
          updated_at?: string;
        };
        Update: {
          candidate_id?: string;
          candidate_match?: number;
          created_at?: string;
          department_id?: string | null;
          id?: string;
          job_id?: string;
          organization_id?: string;
          rejection_reason_id?: string | null;
          screening_question_answers?: Json | null;
          source?: string | null;
          stage_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey";
            columns: ["candidate_id"];
            isOneToOne: false;
            referencedRelation: "candidates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "job_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_rejection_reason_id_fkey";
            columns: ["rejection_reason_id"];
            isOneToOne: false;
            referencedRelation: "reject_reasons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_stage_id_fkey";
            columns: ["stage_id"];
            isOneToOne: false;
            referencedRelation: "application_stages";
            referencedColumns: ["id"];
          },
        ];
      };
      attachments: {
        Row: {
          application_id: string | null;
          attachment_type:
            | Database["public"]["Enums"]["attachment_type_enum"]
            | null;
          candidate_id: string | null;
          created_at: string;
          file_name: string;
          file_path: string;
          file_url: string;
          id: string;
          organization_id: string;
          updated_at: string;
        };
        Insert: {
          application_id?: string | null;
          attachment_type?:
            | Database["public"]["Enums"]["attachment_type_enum"]
            | null;
          candidate_id?: string | null;
          created_at?: string;
          file_name: string;
          file_path: string;
          file_url: string;
          id?: string;
          organization_id: string;
          updated_at?: string;
        };
        Update: {
          application_id?: string | null;
          attachment_type?:
            | Database["public"]["Enums"]["attachment_type_enum"]
            | null;
          candidate_id?: string | null;
          created_at?: string;
          file_name?: string;
          file_path?: string;
          file_url?: string;
          id?: string;
          organization_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "attachments_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attachments_candidate_id_fkey";
            columns: ["candidate_id"];
            isOneToOne: false;
            referencedRelation: "candidates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attachments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      candidates: {
        Row: {
          avatar_url: string | null;
          city: string;
          country: string;
          created_at: string;
          date_of_birth: string;
          educations: Json;
          email: string;
          experiences: Json;
          first_name: string;
          gender: string;
          id: string;
          last_name: string;
          organization_id: string | null;
          phone_number: string | null;
          social_links: Json;
          timezone: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          city: string;
          country: string;
          created_at?: string;
          date_of_birth: string;
          educations: Json;
          email: string;
          experiences: Json;
          first_name: string;
          gender: string;
          id?: string;
          last_name: string;
          organization_id?: string | null;
          phone_number?: string | null;
          social_links: Json;
          timezone: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          city?: string;
          country?: string;
          created_at?: string;
          date_of_birth?: string;
          educations?: Json;
          email?: string;
          experiences?: Json;
          first_name?: string;
          gender?: string;
          id?: string;
          last_name?: string;
          organization_id?: string | null;
          phone_number?: string | null;
          social_links?: Json;
          timezone?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "candidates_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      departments: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          organization_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          organization_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          organization_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "departments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      domain_verification: {
        Row: {
          created_at: string;
          domain: string;
          id: string;
          organization_id: string;
          updated_at: string;
          verification_date: string | null;
          verification_status: Database["public"]["Enums"]["domain_verification_status_enum"];
          verification_token: string;
        };
        Insert: {
          created_at?: string;
          domain: string;
          id?: string;
          organization_id: string;
          updated_at?: string;
          verification_date?: string | null;
          verification_status?: Database["public"]["Enums"]["domain_verification_status_enum"];
          verification_token: string;
        };
        Update: {
          created_at?: string;
          domain?: string;
          id?: string;
          organization_id?: string;
          updated_at?: string;
          verification_date?: string | null;
          verification_status?: Database["public"]["Enums"]["domain_verification_status_enum"];
          verification_token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "domain_verification_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      email_templates: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          organization_id: string;
          subject: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          organization_id: string;
          subject: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          organization_id?: string;
          subject?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "email_templates_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      interview_feedback: {
        Row: {
          created_at: string;
          created_by: string | null;
          feedback: string;
          id: string;
          interview_id: string | null;
          organization_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          feedback: string;
          id?: string;
          interview_id?: string | null;
          organization_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          feedback?: string;
          id?: string;
          interview_id?: string | null;
          organization_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "interview_feedback_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interview_feedback_interview_id_fkey";
            columns: ["interview_id"];
            isOneToOne: false;
            referencedRelation: "interviews";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interview_feedback_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      interviews: {
        Row: {
          application_id: string | null;
          created_at: string;
          created_by: string | null;
          end_at: string;
          id: string;
          interviewer_id: string | null;
          location: string | null;
          organization_id: string;
          start_at: string;
          status: Database["public"]["Enums"]["interview_status_enum"];
          updated_at: string;
        };
        Insert: {
          application_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          end_at: string;
          id?: string;
          interviewer_id?: string | null;
          location?: string | null;
          organization_id: string;
          start_at: string;
          status?: Database["public"]["Enums"]["interview_status_enum"];
          updated_at?: string;
        };
        Update: {
          application_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          end_at?: string;
          id?: string;
          interviewer_id?: string | null;
          location?: string | null;
          organization_id?: string;
          start_at?: string;
          status?: Database["public"]["Enums"]["interview_status_enum"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interviews_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interviews_interviewer_id_fkey";
            columns: ["interviewer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interviews_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      job_posts: {
        Row: {
          benefits: string[] | null;
          created_at: string;
          created_by: string | null;
          department_id: string;
          employment_type: Database["public"]["Enums"]["employment_type_enum"];
          experience_level: Database["public"]["Enums"]["experience_level_enum"];
          id: string;
          job_details: string;
          location: Database["public"]["Enums"]["job_location_enum"];
          organization_id: string | null;
          salary_range: string | null;
          screening_questions: string[] | null;
          skills: string[] | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          benefits?: string[] | null;
          created_at?: string;
          created_by?: string | null;
          department_id: string;
          employment_type: Database["public"]["Enums"]["employment_type_enum"];
          experience_level: Database["public"]["Enums"]["experience_level_enum"];
          id?: string;
          job_details: string;
          location: Database["public"]["Enums"]["job_location_enum"];
          organization_id?: string | null;
          salary_range?: string | null;
          screening_questions?: string[] | null;
          skills?: string[] | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          benefits?: string[] | null;
          created_at?: string;
          created_by?: string | null;
          department_id?: string;
          employment_type?: Database["public"]["Enums"]["employment_type_enum"];
          experience_level?: Database["public"]["Enums"]["experience_level_enum"];
          id?: string;
          job_details?: string;
          location?: Database["public"]["Enums"]["job_location_enum"];
          organization_id?: string | null;
          salary_range?: string | null;
          screening_questions?: string[] | null;
          skills?: string[] | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "job_listings_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "job_listings_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "job_listings_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      job_posts_campaigns: {
        Row: {
          created_at: string;
          end_date: string | null;
          id: string;
          is_integration_enabled: boolean;
          job_id: string;
          organization_id: string;
          start_date: string;
          status: Database["public"]["Enums"]["job_post_campaign_status_enum"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          end_date?: string | null;
          id?: string;
          is_integration_enabled?: boolean;
          job_id: string;
          organization_id: string;
          start_date: string;
          status?: Database["public"]["Enums"]["job_post_campaign_status_enum"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          end_date?: string | null;
          id?: string;
          is_integration_enabled?: boolean;
          job_id?: string;
          organization_id?: string;
          start_date?: string;
          status?: Database["public"]["Enums"]["job_post_campaign_status_enum"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "job_posts_campaigns_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "job_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "job_posts_campaigns_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      organization_members: {
        Row: {
          created_at: string;
          organization_id: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          organization_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          organization_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      organizations: {
        Row: {
          address_1: string | null;
          address_2: string | null;
          admin_id: string | null;
          city: string | null;
          country: string;
          created_at: string;
          domain: string;
          id: string;
          industry: string;
          is_domain_verified: boolean;
          logo_url: string | null;
          name: string;
          profile: string | null;
          state: string | null;
          updated_at: string;
          zip_code: string | null;
        };
        Insert: {
          address_1?: string | null;
          address_2?: string | null;
          admin_id?: string | null;
          city?: string | null;
          country: string;
          created_at?: string;
          domain: string;
          id?: string;
          industry: string;
          is_domain_verified?: boolean;
          logo_url?: string | null;
          name: string;
          profile?: string | null;
          state?: string | null;
          updated_at?: string;
          zip_code?: string | null;
        };
        Update: {
          address_1?: string | null;
          address_2?: string | null;
          admin_id?: string | null;
          city?: string | null;
          country?: string;
          created_at?: string;
          domain?: string;
          id?: string;
          industry?: string;
          is_domain_verified?: boolean;
          logo_url?: string | null;
          name?: string;
          profile?: string | null;
          state?: string | null;
          updated_at?: string;
          zip_code?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organizations_admin_id_fkey";
            columns: ["admin_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      reject_reasons: {
        Row: {
          application_id: string | null;
          content: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          updated_at: string;
        };
        Insert: {
          application_id?: string | null;
          content: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          updated_at?: string;
        };
        Update: {
          application_id?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reject_reasons_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reject_reasons_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          access_role: Database["public"]["Enums"]["user_role_enum"];
          avatar_url: string | null;
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone_number: string;
          updated_at: string;
        };
        Insert: {
          access_role: Database["public"]["Enums"]["user_role_enum"];
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone_number?: string;
          updated_at?: string;
        };
        Update: {
          access_role?: Database["public"]["Enums"]["user_role_enum"];
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          phone_number?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      waitlist: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          is_access_granted: boolean;
          organization_id: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          is_access_granted?: boolean;
          organization_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          is_access_granted?: boolean;
          organization_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "waitlist_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_user_access_role: {
        Args: Record<PropertyKey, never>;
        Returns: Database["public"]["Enums"]["user_role_enum"];
      };
      get_user_organization_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      is_user_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_user_organization_admin: {
        Args: {
          organization_id: string;
        };
        Returns: boolean;
      };
      is_user_organization_member: {
        Args: {
          organization_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      attachment_type_enum:
        | "resume"
        | "cover_letter"
        | "portfolio"
        | "certificate"
        | "reference_letter"
        | "other"
        | "transcript"
        | "work_sample"
        | "professional_license";
      domain_verification_status_enum: "pending" | "verified" | "failed";
      employment_type_enum:
        | "full_time"
        | "part_time"
        | "contract"
        | "internship";
      experience_level_enum: "junior" | "mid" | "senior" | "lead" | "executive";
      interview_status_enum:
        | "scheduled"
        | "completed"
        | "canceled"
        | "awaiting_feedback";
      job_location_enum: "remote" | "hybrid" | "on_site";
      job_post_campaign_status_enum:
        | "active"
        | "paused"
        | "completed"
        | "pending"
        | "draft"
        | "closed";
      user_role_enum: "admin" | "recruiter" | "hiring_manager" | "interviewer";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
