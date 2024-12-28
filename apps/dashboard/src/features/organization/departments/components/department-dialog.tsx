"use client";
import type { Department } from "@optima/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@optima/ui/dialog";
import type React from "react";
import { useState } from "react";
import { NewDepartmentForm } from "./new-department-form";
import { UpdateDepartmentForm } from "./update-department-form";

type DepartmentDialogProps = {
  children: React.ReactNode;
  department?: Department;
};

export function DepartmentDialog({
  children,
  department,
}: DepartmentDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {department ? "Edit Department" : "New Department"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {department
            ? "Update department details"
            : "Create a new department to include with job postings."}
        </DialogDescription>
        {department ? (
          <UpdateDepartmentForm
            onSuccess={() => {
              setOpen(false);
            }}
            department={department}
          />
        ) : (
          <NewDepartmentForm
            onSuccess={() => {
              setOpen(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
