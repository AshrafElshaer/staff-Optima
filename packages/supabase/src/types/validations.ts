import { z } from "zod";

import { userRoleEnum } from "./index";

interface JSONContent {
  [key: string]: unknown;
  type?: string;
  attrs?: Record<string, unknown>;
  content?: JSONContent[];
  marks?: {
    type: string;
    attrs?: Record<string, unknown>;
    [key: string]: unknown;
  }[];
  text?: string;
}

export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, {
    message: "Organization name is required",
  }),
  domain: z
    .string()
    .regex(/^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, "Invalid domain format"),
  industry: z.string().min(2, {
    message: "Industry is required",
  }),
  logo_url: z.string().nullable(),
  address_1: z.string().nullable(),
  address_2: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().min(2, {
    message: "Country is required",
  }),
  admin_id: z.string().uuid(),
  profile: z.custom<JSONContent>().optional(),
  state: z.string().nullable(),
  zip_code: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const organizationInsertSchema = organizationSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  admin_id: true,
  logo_url: true,
});

export const organizationUpdateSchema = organizationSchema.partial().required({
  id: true,
});

export const organizationMemberSchema = z.object({
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});
export const organizationMemberInsertSchema = organizationMemberSchema.omit({
  updated_at: true,
  created_at: true,
});

export const organizationMemberUpdateSchema =
  organizationMemberSchema.partial();

export const departmentSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string().min(2, {
    message: "Must be minimum 2 characters",
  }),
  created_at: z.string(),
  updated_at: z.string(),
});

export const departmentInsertSchema = departmentSchema.omit({
  id: true,
  organization_id: true,
  created_at: true,
  updated_at: true,
});

export const departmentUpdateSchema = departmentSchema.partial().required({
  id: true,
});

export const pipelineStageSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  title: z.string().min(2, {
    message: "Must be minimum 2 characters",
  }),
  description: z.string().min(2, {
    message: "Must be minimum 2 characters",
  }),
  indicator_color: z.string().min(2, {
    message: "Must be minimum 2 characters",
  }),
  stage_order: z.string().min(1, {
    message: "Must be positive number",
  }),
  created_at: z.string(),
  updated_at: z.string(),
});

export const pipelineStageInsertSchema = pipelineStageSchema.omit({
  id: true,
  organization_id: true,
  created_at: true,
  updated_at: true,
});

export const pipelineStageUpdateSchema = pipelineStageSchema
  .partial()
  .required({
    id: true,
  });

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  avatar_url: z.string().url().nullable(),
  access_role: z.nativeEnum(userRoleEnum),
  created_at: z.string(),
  updated_at: z.string(),
});

export const userInsertSchema = userSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  avatar_url: true,
});

export const userUpdateSchema = userSchema.partial().required({
  id: true,
});
