import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

export const createAttachment = async (
  supabase: SupabaseInstance,
  attachments: TablesInsert<"attachments">[],
) => {
  return await supabase
    .from("attachments")
    .insert(attachments)
    .select()
    .single();
};

export const updateAttachment = async (
  supabase: SupabaseInstance,
  attachment: TablesUpdate<"attachments">,
) => {
  if (!attachment.id) {
    throw new Error("Attachment ID is required");
  }

  return await supabase
    .from("attachments")
    .update(attachment)
    .eq("id", attachment.id)
    .select()
    .single();
};
