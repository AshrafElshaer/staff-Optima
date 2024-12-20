import type { RowSelectionState } from "@tanstack/react-table";
import type { ReactNode } from "react";

type TableSelectToastProps = {
  toastId?: string | number;
  rowSelection: number;
  totalRows: number;
  children: ReactNode;
};

export function TableSelectToast({
  toastId,
  rowSelection,
  children,
  totalRows,
}: TableSelectToastProps) {
  console.log(rowSelection);
  return (
    <div className="text-foreground bg-secondary w-full sm:w-[20rem] flex items-center gap-2 px-4 pr-2 py-2 rounded-full border overflow-hidden">
      <p>{rowSelection} / {totalRows} invoices Selected </p>
      {children}
    </div>
  );
}
