"use client";

import type { User } from "@optima/supabase/types";
import { Avatar } from "@optima/ui/avatar";
import { Badge } from "@optima/ui/badge";
import { Button } from "@optima/ui/button";
import { Checkbox } from "@optima/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@optima/ui/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Delete03Icon,
  Edit01Icon,
  FileDownloadIcon,
  ViewIcon,
} from "hugeicons-react";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";

export const columns: ColumnDef<{
  id: number;
  date: Date;
  amount: number;
  status: string;
}>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="absolute top-4 "
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="absolute top-4 "
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <span>{moment(row.original.date).format("MM/DD/YYYY")}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.original.amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      return (
        <Badge
          variant={
            status === "paid"
              ? "success"
              : status === "pending"
                ? "warning"
                : "destructive"
          }
          size="md"
          className="capitalize rounded-sm"
        >
          {row.original.status}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-2 w-fit justify-end">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ViewIcon size={18} strokeWidth={2} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-sm">
                View Invoice
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FileDownloadIcon size={18} strokeWidth={2} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-sm">
                Download Invoice
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
