


-- Organization 

-- - email_templates
-- - organization_integrations

-- Users
-- - user_preferences
-- - user_integrations



create type user_role_enum as enum ('admin', 'recruiter','hiring_manager','interviewer');

create table users (
    id uuid references auth.users on delete cascade primary key,
    email text not null unique,
    first_name text not null,
    last_name text not null,
    avatar_url text,
    phone_number text not null default '',
    access_role user_role_enum not null,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_users_id on users(id);
create index idx_users_email on users(email);


create table organizations (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    logo_url text,
    domain text not null,
    is_domain_verified boolean not null default false,
    admin_id uuid references users(id) on delete set null,
    industry text not null,
    profile json,

    address_1 text,
    address_2 text,
    city text,
    state text,
    zip_code text,
    country text not null,



    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_organizations_id on organizations(id);
create index idx_organizations_domain on organizations(domain);

create type domain_verification_status_enum as enum ('pending', 'verified', 'failed');

create table domain_verification (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) on delete cascade not null,
    domain text not null,
    verification_token text not null,
    verification_status domain_verification_status_enum not null default 'pending',
    verification_date timestamp with time zone,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create table organization_members (
    organization_id uuid references organizations(id) not null on delete cascade,
    user_id uuid references users(id) on delete cascade,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_organization_members_org on organization_members(organization_id);
create index idx_organization_members_user on organization_members(user_id);

create table departments (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) not null on delete cascade,

    name text not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_departments_org on departments(organization_id);

create table application_stages(
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) not null on delete cascade,

    title text not null,
    stage_order numeric not null,
    indicator_color string not null

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create table application_stage_triggers(
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) not null on delete cascade,
    stage_id uuid references application_stages(id) on delete cascade,
    action_type text not null, -- e.g., 'send_email', 'update_status'
    action_data jsonb not null, -- Contains specifics like email templates or status values
    trigger_condition text not null, -- e.g., 'on_start', 'on_complete'
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create table email_templates (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) on delete cascade not null ,
    title text not null,
    body text not null,
    subject text not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_email_templates_org on email_templates(organization_id);


create type employment_type_enum as enum ('full_time', 'part_time', 'contract', 'internship');
create type experience_level_enum as enum ('junior', 'mid', 'senior', 'lead', 'executive');
create type job_status_enum as enum ('published', 'draft', 'closed', 'paused');
create type job_location_enum as enum ('remote','hybrid','on_site');


create table job_posts (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) not null on delete cascade,
    created_by uuid references users(id)  on delete set null,
    department_id uuid references departments(id) on delete set null,
    title text not null,
    employment_type employment_type_enum not null,
    salary_range text,
    experience_level experience_level_enum not null,
    status job_status_enum default 'draft',
    location job_location_enum not null,

    screening_questions text[],
    skills text[],
    benefits text[],
    job_details text not null,


    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_job_listings_id on job_listings(id);
create index idx_job_listings_org on job_listings(organization_id);

-- create table job_listing_campaigns (
--     id uuid primary key default gen_random_uuid(),
--     organization_id uuid references organizations(id) not null on delete cascade,
--     job_listing_id uuid references job_listings(id) not null on delete cascade,
--     start_date timestamp with time zone not null,
--     end_date timestamp with time zone,
--     status text not null,
--     platform_settings jsonb, -- Store platform-specific campaign settings
--     created_at timestamp with time zone default now() not null,
--     updated_at timestamp with time zone default now() not null
-- );

create index idx_campaigns_org on job_listing_campaigns(organization_id);
create index idx_campaigns_job on job_listing_campaigns(job_listing_id);


create table candidates (
  id uuid not null default gen_random_uuid (),
  organization_id uuid references organizations(id) not null on delete cascade,
  avatar_url text null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone_number text null,
  timezone text not null,
  country text not null,
  city text not null,
  gender text not null,
  date_of_birth timestamp with time zone not null,
  social_links jsonb not null,
  educations jsonb not null,
  experiences jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

create index idx_candidates_organization on candidates(organization_id);
create index idx_candidates_email on candidates(email);

create table applications(
    id uuid primary key default gen_random_uuid(),
    job_id uuid references job_listings(id) on delete cascade,
    organization_id uuid references organizations(id) not null on delete cascade,
    department_id uuid references departments(id) not null on delete set null,
    candidate_id uuid references candidates(id) not null on delete cascade,
    stage_id uuid references application_stages(id) not null on delete set null,
    rejection_reason_id uuid references reject_reasons(id) on delete set null,

    source text,
    screening_question_answers jsonb,
    candidate_match numeric not null,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_application_id on applications(id);
create index idx_application_job_id on applications(job_id);
create index idx_application_candidate_id on applications(candidate_id);

create table reject_reasons (
    id uuid primary key default gen_random_uuid(),
    application_id uuid references applications(id) on delete cascade,
    content text not null,
    organization_id uuid references organizations(id) not null on delete cascade,


    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_rejection_id on reject_reasons(id);
create index idx_rejection_application_id on reject_reasons(application_id);





create type attachment_type_enum as enum ('resume', 'cover_letter', 'portfolio', 'certificate', 'reference_letter', 'other', 'transcript', 'work_sample', 'professional_license');

create table attachments (
    id uuid primary key default gen_random_uuid(),
    candidate_id uuid references candidates(id) on delete cascade,
    organization_id uuid references organizations(id) not null on delete cascade,
    application_id uuid references applications (id) on delete cascade;

    file_name text not null,
    file_url text not null,
    file_path text not null,
    attachment_type attachment_type_enum default 'resume',
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_attachments_candidate_id on attachments(candidate_id);

   
create type interview_status_enum as enum ('scheduled', 'completed', 'canceled','awaiting_feedback');

create table interviews (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) not null on delete cascade,
    application_id uuid references applications(id)  on delete cascade,
    interviewer_id uuid references users(id) on delete set null,
    start_at timestamp with time zone not null,
    end_at timestamp with time zone not null,
    location text,
    status interview_status_enum not null default 'scheduled',

    created_by uuid references users(id) on delete set null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_interviews_application_id on interviews(application_id);
create index idx_interviews_interviewer_id on interviews(interviewer_id);

create table interview_feedback (
    id uuid primary key default gen_random_uuid(),
    interview_id uuid references interviews(id) on delete cascade,
    organization_id uuid references organizations(id) not null on delete cascade,
    created_by uuid references users(id) on delete set null,
    feedback text not null,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_interview_feedback_interview_id on interview_feedback(interview_id);
create index idx_interview_feedback_created_by on interview_feedback(created_by);






