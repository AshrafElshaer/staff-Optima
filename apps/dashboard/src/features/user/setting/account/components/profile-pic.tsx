"use client";

import { DropZone } from "@/components/drop-zone";
import { updateUserAction } from "@/features/user/user.actions";
import { useSupabase } from "@/hooks/use-supabase";
import { uploadUserAvatar } from "@/lib/supabase/storage";
import type { User } from "@optima/supabase/types";
import { Avatar } from "@optima/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { Separator } from "@optima/ui/separator";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ProfilePic({ user }: { user: User }) {
  const supabase = useSupabase();
  const router = useRouter();
  const { executeAsync: updateUser } = useAction(updateUserAction, {
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold ">Profile Picture</CardTitle>
        {/* <CardDescription>Manage your account settings and preferences.</CardDescription> */}
      </CardHeader>
      <Separator />
      <CardContent className="flex items-center justify-between gap-4">
        <p className="text-compact-xlarge text-secondary-foreground">
          Accepts : PNG, JPG, or SVG. <br />
          Max size : 1MB <br />
          Recommended dimensions: <br />
          200x200 pixels.
        </p>
        <DropZone
          options={{
            accept: {
              "image/png": [".png"],
              "image/jpeg": [".jpg", ".jpeg"],
              "image/svg+xml": [".svg"],
              "image/webp": [".webp"],
              "image/x-icon": [".ico"],
            },
            maxSize: 1000000,
            maxFiles: 1,
            multiple: false,
            onDrop: async (acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                toast.promise(
                  async () => {
                    const url = await uploadUserAvatar({
                      supabase,
                      userId: user.id,
                      file,
                    });
                    const result = await updateUser({
                      id: user.id,
                      avatar_url: url,
                    });
                    if (result?.serverError)
                      throw new Error(result.serverError);
                  },
                  {
                    loading: "Uploading profile picture...",
                    success: "Profile picture uploaded successfully",
                    error: (error) => error.message,
                  },
                );
              }
            },
            onDropRejected: (rejectedFiles) => {
              for (const file of rejectedFiles) {
                toast.error(file.errors[0]?.message);
              }
            },
          }}
        >
          <Avatar
            className="size-20"
            shape="square"
            initials={`${user?.first_name[0]}${user?.last_name[1]}`}
            src={user?.avatar_url}
          />
          <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center">
            <Plus className="size-10 text-secondary-foreground" />
          </div>
        </DropZone>
      </CardContent>
      <Separator />
      <CardFooter className=" p-4">
        <CardDescription>
          This is your avatar. Click on the avatar to upload a custom one from
          your files.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
