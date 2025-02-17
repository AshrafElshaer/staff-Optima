import type { AttachmentType, SupabaseInstance } from "@optima/supabase/types";
type UploadFileProps = {
  supabase: SupabaseInstance;
  bucket: string;
  path: string;
  file: File;
};
export async function uploadFile({
  supabase,
  bucket,
  path,
  file,
}: UploadFileProps) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return publicUrl;
}

type UploadOrganizationLogoProps = {
  supabase: SupabaseInstance;
  organizationId: string;
  file: File;
};
export async function uploadOrganizationLogo({
  supabase,
  organizationId,
  file,
}: UploadOrganizationLogoProps) {
  return uploadFile({
    supabase,
    bucket: "organization_logos",
    path: organizationId,
    file,
  });
}

type UploadUserAvatarProps = {
  supabase: SupabaseInstance;
  userId: string;
  file: File;
};
export async function uploadUserAvatar({
  supabase,
  userId,
  file,
}: UploadUserAvatarProps) {
  return uploadFile({ supabase, bucket: "avatars", path: userId, file });
}

type UploadCandidateAttachmentProps = {
  supabase: SupabaseInstance;
  candidateId: string;
  file: {
    fileType: AttachmentType;
    file: File;
  };
};
export async function uploadCandidateAttachment({
  supabase,
  candidateId,
  file,
}: UploadCandidateAttachmentProps) {
  const bucket = "attachments";
  const path = `${candidateId}/${file.file.name}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file.file, {
    contentType: file.file.type,
    upsert: true,
  });

if (error) {
  throw error;
}

const {
  data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return { publicUrl, path, fileName: file.file.name, fileType: file.fileType };
}
