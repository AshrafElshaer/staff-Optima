"use client";
import type { User } from "@optima/supabase/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@optima/ui/alert-dialog";
import { Button } from "@optima/ui/button";
import { Input } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import { Delete03Icon } from "hugeicons-react";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";
import { deleteTeamMember } from "../members.actions";

export function DeleteMember({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const { execute: deleteUser, isExecuting: isDeleting } = useAction(
    deleteTeamMember,
    {
      onSuccess: () => {
        toast.success("User deleted successfully");
        setOpen(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this user
          and remove your data from our servers.
        </AlertDialogDescription>

        <div className="space-y-4 p-4 pt-0">
          <Label className="font-semibold">
            Please type{" "}
            <span className="bg-muted p-1">
              {user.first_name} {user.last_name}
            </span>
            to confirm
          </Label>
          <Input
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="IT , Support etc"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={
              confirmation !== `${user.first_name} ${user.last_name}` ||
              isDeleting
            }
            onClick={() => deleteUser({ id: user.id })}
          >
            {isDeleting ? <Loader className="animate-spin size-4" /> : null}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
