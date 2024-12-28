"use client";
import type { Department } from "@optima/supabase/types";
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
import { useState } from "react";
import { toast } from "sonner";
import { deleteDepartmentAction } from "../departments.actions";

export function DeleteDepartment({
  department,
}: {
  department: Department;
}) {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const { execute: deleteDepartment, isExecuting: isDeleting } = useAction(
    deleteDepartmentAction,
    {
      onSuccess: () => {
        toast.success("Department deleted successfully");
        setOpen(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-secondary-foreground hover:text-foreground"
        >
          <Delete03Icon size={18} strokeWidth={2} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this
          department and remove your data from our servers.
        </AlertDialogDescription>

        <div className="space-y-4 p-4 pt-0">
          <Label className="font-semibold">
            Please type <span className="bg-muted p-1">{department.name} </span>
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
            disabled={confirmation !== department.name || isDeleting}
            onClick={() => deleteDepartment({ id: department.id })}
          >
            {isDeleting ? <Loader className="animate-spin size-4" /> : null}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
