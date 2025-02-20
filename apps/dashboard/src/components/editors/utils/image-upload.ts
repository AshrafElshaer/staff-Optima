import { createBrowserClient } from "@/lib/supabase/browser";
import { uploadFile } from "@/lib/supabase/storage";
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

const onUpload = async (file: File) => {
  const supabase = createBrowserClient();
  const publicUrl = await uploadFile({
    supabase,
    bucket: "profile_documents",
    path: `${Date.now()}/${file.name}`,
    file,
  });

  return publicUrl;
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
