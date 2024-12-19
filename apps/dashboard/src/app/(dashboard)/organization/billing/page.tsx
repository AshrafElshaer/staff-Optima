import { PageTitle } from "@/components/page-title";
import { PaymentInUse } from "@/features/organization/billing/payment-in-use";
import { PlanCard } from "@/features/organization/billing/plan-card";
import { BillingTable } from "@/features/organization/billing/table";
import { columns } from "@/features/organization/billing/table/columns";
import { Button } from "@optima/ui/button";
import { DatePickerWithRange } from "@optima/ui/date-picker-range";
import { Calendar01Icon } from "hugeicons-react";

const invoices = [
  {
    id: 1,
    date: new Date(),
    amount: 100,
    status: "paid",
  },
  {
    id: 2,
    date: new Date(),
    amount: 100,
    status: "pending",
  },
  {
    id: 3,
    date: new Date(),
    amount: 100,
    status: "failed",
  },
];

export default function OrganizationBillingPage() {
  return (
    <main className="flex flex-col gap-6 flex-1">
      <PageTitle title="Manage your organization's billing and usage details, including subscription plans and payment methods." />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PlanCard />
        <PaymentInUse />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-lg">Invoices</h4>
          {/* <Button variant="secondary">
            <Calendar01Icon strokeWidth={2} size={16} />
            12/23/2024 - 01/01/2025
          </Button> */}
          <DatePickerWithRange className="w-fit" />
        </div>
      </section>
      <BillingTable data={invoices} columns={columns} />
    </main>
  );
}
