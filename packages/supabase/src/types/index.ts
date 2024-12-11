import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Enums } from "./database";

export type SupabaseInstance = SupabaseClient<Database>;

export type UserAccessRole = Enums<"user_role_enum">;
export type JobStatus = Enums<"job_status_enum">;
export type JobLocation = Enums<"job_location_enum">;
export type InterviewStatus = Enums<"interview_status_enum">;
export type ExperienceLevel = Enums<"experience_level_enum">;
export type EmploymentType = Enums<"employment_type_enum">;
export type AttachmentType = Enums<"attachment_type_enum">;

export const userRoleEnum: {
  [key in UserAccessRole]: key;
} = {
  admin: "admin",
  hiring_manager: "hiring_manager",
  interviewer: "interviewer",
  recruiter: "recruiter",
};

export * from "./database";
