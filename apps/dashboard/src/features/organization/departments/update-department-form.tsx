import { zodResolver } from "@hookform/resolvers/zod";
import type { Department } from "@optima/supabase/types";
import { departmentUpdateSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { DialogClose, DialogFooter } from "@optima/ui/dialog";
import { Input } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import {
  createDepartmentAction,
  updateDepartmentAction,
} from "../organization.actions";

export function UpdateDepartmentForm({
  onSuccess,
  department,
}: {
  onSuccess: () => void;
  department: Department;
}) {
  const { execute: updateDepartment, isExecuting: isUpdating } = useAction(
    updateDepartmentAction,
    {
      onSuccess: () => {
        toast.success("Department updated successfully");
        onSuccess();
      },
      onError: ({ error }) => {
        toast.error(error.serverError ?? "Something went wrong");
      },
    },
  );
  const form = useForm<z.infer<typeof departmentUpdateSchema>>({
    resolver: zodResolver(departmentUpdateSchema),
    defaultValues: {
      id: department.id,
      name: department.name,
      organization_id: department.organization_id ?? undefined,
    },
  });

  function onSubmit(data: z.infer<typeof departmentUpdateSchema>) {
    updateDepartment(data);
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
            <Button variant="outline" disabled={isUpdating}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isUpdating}>
            {isUpdating ? <Loader className="animate-spin size-4" /> : null}
            Save
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
