"use client";

import type { User } from "@optima/supabase/types";
import { Avatar } from "@optima/ui/avatar";
import { Button } from "@optima/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Delete03Icon, Edit01Icon } from "hugeicons-react";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { DeleteMember } from "../delete-team-member";
import { UpdateMember } from "../update-team-member";

export const columns: ColumnDef<User>[] = [
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4 min-w-40">
          <Avatar
            src={row.original?.avatar_url ?? ""}
            initials={`${row.original.first_name[0]}${row.original.last_name[0]}`}
            shape="square"
            size="small"
          />
          <span>
            {row.original.first_name} {row.original.last_name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "access_role",
    header: "Access Role",
    cell: ({ row }) => {
      return (
        <div className="capitalize min-w-24">
          {row.original.access_role.replace("_", " ")}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Joined At",
    cell: ({ row }) => {
      return (
        <div className="min-w-36">
          {moment(row.original.created_at).format("MMM Do YYYY")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <UpdateMember user={user}>
              <DropdownMenuItem asDialogTrigger>
                <Edit01Icon size={16} strokeWidth={2} />
                Edit
              </DropdownMenuItem>
            </UpdateMember>
            <DeleteMember user={user}>
              <DropdownMenuItem asDialogTrigger>
                <Delete03Icon size={16} strokeWidth={2} />
                Delete
              </DropdownMenuItem>
            </DeleteMember>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
