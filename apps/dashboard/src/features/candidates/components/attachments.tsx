import { useSupabase } from "@/hooks/use-supabase";
import { getAttachmentsByApplicationId } from "@optima/supabase/queries";
import { buttonVariants } from "@optima/ui/button";
import { Skeleton } from "@optima/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function Attachments({ applicationId }: { applicationId: string }) {
  const supabase = useSupabase();
  const { data: attachments, isLoading } = useQuery({
    queryKey: ["attachments", applicationId],
    queryFn: async () => {
      const { data, error } = await getAttachmentsByApplicationId(
        supabase,
        applicationId,
      );
      if (error) {
        throw error;
      }
      return data;
    },
  });
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {attachments?.map((attachment) => (
        <Link
          key={attachment.id}
          href={attachment.file_url}
          target="_blank"
          className={buttonVariants({
            variant: "secondary",
            className: "!justify-start",
          })}
        >
          <p className=" font-medium">{attachment.file_name}</p>
          <p className=" font-medium capitalize">
            ( {attachment.attachment_type} )
          </p>
        </Link>
      ))}
    </div>
  );
}
