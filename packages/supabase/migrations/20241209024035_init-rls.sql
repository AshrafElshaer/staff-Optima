-- Organizations
alter table organizations enable row level security;

create policy "Create Organization" on organizations for insert with check (admin_id = auth.uid());
create policy "Public Can View Organization" on organizations for select using (true);
create policy "Organization Admin Can Update Organization" on organizations for update using (auth.uid() = admin_id);
create policy "Organization Admin Can Delete Organization" on organizations for delete using (auth.uid() = admin_id);

-- Domain Verification
alter table domain_verification enable row level security;

create policy "Only Admin Can View Domain Verification" on domain_verification for select using (is_user_organization_admin(organization_id));
create policy "Organization Admin Can Create Domain Verification" on domain_verification for insert with check (is_user_organization_admin(organization_id));
create policy "Organization Admin Can Update Domain Verification" on domain_verification for update using (is_user_organization_admin(organization_id));
create policy "Organization Admin Can Delete Domain Verification" on domain_verification for delete using (is_user_organization_admin(organization_id));



-- Organization Members
alter table organization_members enable row level security;

create policy "Organization Members Can View Organization Member" on organization_members for select using (true);
create policy "Organization Admin Can Create Organization Member" on organization_members for insert with check (is_user_organization_admin(organization_id));
create policy "Organization Admin Can Update Organization Member" on organization_members for update using (is_user_organization_admin(organization_id));
create policy "Organization Admin Can Delete Organization Member" on organization_members for delete using (is_user_organization_admin(organization_id));

-- Departments
alter table departments enable row level security;

create policy "Public can read department" on departments for select using (true);
create policy "Only Admin Can Create Department" on departments for insert with check (is_user_organization_admin(organization_id));
create policy "Only Admin Can Update Department" on departments for update using (is_user_organization_admin(organization_id));
create policy "Only Admin Can Delete Department" on departments for delete using (is_user_organization_admin(organization_id));

-- Application Stages

alter table application_stages enable row level security;

create policy "Public can read Stage" on application_stages for select using (true);
create policy "Only Admin Can Create Stage" on application_stages for insert with check (is_user_organization_admin(organization_id));
create policy "Only Admin Can Update Stage" on application_stages for update using (is_user_organization_admin(organization_id));
create policy "Only Admin Can Delete Stage" on application_stages for delete using (is_user_organization_admin(organization_id));

-- Application Stages triggers

alter table application_stage_triggers enable row level security;

create policy "Public can read Stage Triggers" on application_stage_triggers for select using (true);
create policy "Only Admin Can Create Stage Triggers" on application_stage_triggers for insert with check (is_user_organization_admin(organization_id));
create policy "Only Admin Can Update Stage Triggers" on application_stage_triggers for insert with check (is_user_organization_admin(organization_id));
create policy "Only Admin Can Delete Stage Triggers" on application_stage_triggers for insert with check (is_user_organization_admin(organization_id));

-- Email Templates
alter table email_templates enable row level security;

create policy "Members Can Read Email Templates" on email_templates for select using (is_user_organization_member(organization_id));
create policy "Only Admin Can Create Email Templates" on email_templates for insert with check (is_user_organization_admin(organization_id));
create policy "Only Admin Can Update Email Templates" on email_templates for update using (is_user_organization_admin(organization_id));
create policy "Only Admin Can Delete Email Templates" on email_templates for delete using (is_user_organization_admin(organization_id));

-- Users
alter table users enable row level security;

create policy "Public Can Create User" on users for insert with check (auth.uid()=id or is_user_admin());
create policy "Public Can View User" on users for select using (true);
create policy "Admin Or User Can Update User" on users for update using (is_user_admin() or auth.uid() = id);
create policy "Admin Can Delete User" on users for delete using (is_user_admin());


-- Job Posts
alter table job_posts enable row level security;

create policy "Organization admin , recruiter or hiring_manager Can Create Job Post" on job_posts for insert with check (is_user_organization_admin(organization_id) or get_user_access_role() = 'recruiter' or get_user_access_role() = 'hiring_manager');

create policy "Public Can View Job Post" on job_posts for select using (true);

create policy "Admin Or Creator Can Update Job Post" on job_posts for update using 
(is_user_organization_admin(organization_id) or get_user_access_role() = 'recruiter' or get_user_access_role() = 'hiring_manager' or auth.uid() = created_by);

create policy "Admin Or Creator Can Delete Job Post" on job_posts for delete using (is_user_organization_admin(organization_id) or get_user_access_role() = 'recruiter' or get_user_access_role() = 'hiring_manager' or auth.uid() = created_by);

-- Job Posts Campaigns
alter table job_posts_campaigns enable row level security;
create policy "Organization Members Can Create Job Post Campaign" on job_posts_campaigns for insert with check (is_user_organization_member(organization_id));

create policy "Organization Members Can Update Job Post Campaign" on job_posts_campaigns for update using (is_user_organization_member(organization_id));

create policy "Organization Members Can Delete Job Post Campaign" on job_posts_campaigns for delete using (is_user_organization_member(organization_id));

create policy "Organization Members Can View Job Post Campaign" on job_posts_campaigns for select using (is_user_organization_member(organization_id));


-- Candidates
alter table candidates enable row level security;

create policy "Public Can Create Candidates" on candidates for insert with check(true);
create policy "Organization Members Can Read Candidates" on candidates for select using(is_user_organization_member(organization_id));
create policy "Organization Members Can Update Candidates" on candidates for update using(is_user_organization_member(organization_id));
create policy "Organization admin , recruiter or hiring mangers Can Delete Candidates" on candidates for delete using(is_user_organization_admin(organization_id) or get_user_access_role() = 'recruiter' or get_user_access_role() = 'hiring_manager');

-- Applications
alter table applications enable row level security;

create policy "Public Can Create Applications" on applications for insert with check(true);
create policy "Organization Members Can Read Applications" on applications for select using(is_user_organization_member(organization_id));
create policy "Organization admin , recruiter or hiring mangers Can Update Applications" on applications for update using(is_user_organization_admin(organization_id) or get_user_access_role() = 'recruiter' or get_user_access_role() = 'hiring_manager');

create policy "Organization admin , recruiter or hiring mangers Can Delete Applications" on applications for delete using(is_user_organization_admin(organization_id) or get_user_access_role() = 'recruiter' or get_user_access_role() = 'hiring_manager');

-- Reject_reasons
alter table reject_reasons enable row level security;

create policy "Organization admin , interviewer or hiring mangers Can Create Reject_reasons" on reject_reasons for insert with check(
    is_user_organization_admin(organization_id) or get_user_access_role() = 'interviewer' or get_user_access_role() = 'hiring_manager'
);
create policy "Organization Members Can Read Reject_reasons" on reject_reasons for select using(is_user_organization_member(organization_id));
create policy "Organization Members Can Update Reject_reasons" on reject_reasons for update using(is_user_organization_member(organization_id));
create policy "Organization admin , interviewer or hiring mangers  Can Delete Reject_reasons" on reject_reasons for delete using(is_user_organization_admin(organization_id) or get_user_access_role() = 'interviewer' or get_user_access_role() = 'hiring_manager');

-- Attachments
alter table attachments enable row level security;

create policy "Public Can Create Attachments" on attachments for insert with check(true);
create policy "Organization Members Can Read Attachments" on attachments for select using(is_user_organization_member(organization_id));
create policy "Organization Members Can Update Attachments" on attachments for update using(is_user_organization_member(organization_id));
create policy "Organization Members Can Delete Attachments" on attachments for delete using(is_user_organization_member(organization_id));

-- Interviews
alter table interviews enable row level security;

create policy "Organization Members Can Create Interviews" on interviews for insert with check(is_user_organization_member(organization_id));
create policy "Organization Members Can Read Interviews" on interviews for select using(is_user_organization_member(organization_id));
create policy "Creator and admin Can Update Interviews" on interviews for update using(is_user_organization_admin(organization_id) or auth.uid() = created_by);
create policy "Creator and admin Can Delete Interviews" on interviews for delete using(is_user_organization_admin(organization_id) or auth.uid() = created_by);

-- Interview_feedback
alter table interview_feedback enable row level security;

create policy "Organization admin , interviewer or hiring mangers Can Create Interview_feedback" on interview_feedback for insert with check(is_user_organization_admin(organization_id) or get_user_access_role() = 'interviewer' or get_user_access_role() = 'hiring_manager');

create policy "Organization Members Can Read Interview_feedback" on interview_feedback for select using(is_user_organization_member(organization_id));
create policy "Creator and admin Can Update Interview_feedback" on interview_feedback for update using(is_user_organization_admin(organization_id) or auth.uid() = created_by);
create policy "Creator and admin Can Delete Interview_feedback" on interview_feedback for delete using(is_user_organization_admin(organization_id) or auth.uid() = created_by);












