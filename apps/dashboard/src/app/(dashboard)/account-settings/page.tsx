import { PageTitle } from "@/components/page-title";
import { Separator } from "@optima/ui/separator";

export default function AccountSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Manage your account settings and preferences." className="text-lg" />

      <div className="flex items-center gap-4 w-full mt-8 overflow-x-scroll scrollbar-hide">
        <h2 className=" font-medium min-w-fit">Account</h2>
        <h2 className=" font-medium min-w-fit">Appearance</h2>
        <h2 className=" font-medium min-w-fit">Notifications</h2>
        <h2 className=" font-medium min-w-fit">Security</h2>
      </div>

    </div>
  );
}
