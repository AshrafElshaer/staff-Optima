import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Enums, Tables } from "./database";
export * from "./database";

export type SupabaseInstance = SupabaseClient<Database>;

export type UserAccessRole = Enums<"user_role_enum">;
export type JobStatus = Enums<"job_status_enum">;
export type JobLocation = Enums<"job_location_enum">;
export type InterviewStatus = Enums<"interview_status_enum">;
export type ExperienceLevel = Enums<"experience_level_enum">;
export type EmploymentType = Enums<"employment_type_enum">;
export type AttachmentType = Enums<"attachment_type_enum">;
export type JobPostCampaignStatus = Enums<"job_post_campaign_status_enum">;

export const userRoleEnum: {
  [key in UserAccessRole]: key;
} = {
  admin: "admin",
  hiring_manager: "hiring_manager",
  interviewer: "interviewer",
  recruiter: "recruiter",
};

export const jobStatusEnum: {
  [key in JobStatus]: key;
} = {
  published: "published",
  draft: "draft",
  closed: "closed",
  paused: "paused",
};

export const jobLocationEnum: {
  [key in JobLocation]: key;
} = {
  remote: "remote",
  on_site: "on_site",
  hybrid: "hybrid",
};

export const jobPostCampaignStatusEnum: {
  [key in JobPostCampaignStatus]: key;
} = {
  active: "active",
  pending: "pending",
  completed: "completed",
  paused: "paused",
};

export const experienceLevelEnum: {
  [key in ExperienceLevel]: key;
} = {
  junior: "junior",
  mid: "mid",
  senior: "senior",
  lead: "lead",
  executive: "executive",
};

export const employmentTypeEnum: {
  [key in EmploymentType]: key;
} = {
  full_time: "full_time",
  part_time: "part_time",
  contract: "contract",
  internship: "internship",
};

export const attachmentTypeEnum: {
  [key in AttachmentType]: key;
} = {
  resume: "resume",
  cover_letter: "cover_letter",
  portfolio: "portfolio",
  certificate: "certificate",
  reference_letter: "reference_letter",
  other: "other",
  transcript: "transcript",
  work_sample: "work_sample",
  professional_license: "professional_license",
};

export type User = Tables<"users">;
export type Organization = Tables<"organizations">;
export type Department = Tables<"departments">;
export type ApplicationStage = Tables<"application_stages">;
export type EmailTemplate = Tables<"email_templates">;
export type JobPost = Tables<"job_posts">;
export type Candidate = Tables<"candidates">;
export type Application = Tables<"applications">;
export type DomainVerification = Tables<"domain_verification">;
export type JobPostCampaign = Tables<"job_posts_campaigns">;

export interface ApplicationWithJobPost extends Application {
  job_posts: {
    id: string;
    title: string;
  };
}

export type CandidateWithApplication = Candidate & {
  applications: ApplicationWithJobPost[];
};
