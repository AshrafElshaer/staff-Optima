import { zodResolver } from "@hookform/resolvers/zod";
import { departmentInsertSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { DialogClose, DialogFooter } from "@optima/ui/dialog";
import { Input } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createDepartmentAction } from "../organization.actions";

export function NewDepartmentForm({ onSuccess }: { onSuccess: () => void }) {
  const { execute: createDepartment, isExecuting: isCreating } = useAction(
    createDepartmentAction,
    {
      onSuccess: () => {
        toast.success("Department created successfully");
        onSuccess();
      },
      onError: ({ error }) => {
        toast.error(error.serverError ?? "Something went wrong");
      },
    },
  );
  const form = useForm<z.infer<typeof departmentInsertSchema>>({
    resolver: zodResolver(departmentInsertSchema),
  });

  function onSubmit(data: z.infer<typeof departmentInsertSchema>) {
    createDepartment({
      name: data.name.trim(),
    });
  }
  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2 p-4 pt-0">
          <Label>Department Name</Label>
          <Input
            {...form.register("name")}
            placeholder="Information Technology"
            error={form.formState.errors.name?.message}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isCreating}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isCreating}>
            {isCreating ? <Loader className="animate-spin size-4" /> : null}
            Create
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
