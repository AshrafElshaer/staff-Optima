import { PageTitle } from "@/components/page-title";
import { AccountSettings } from "@/features/user/setting/account/components/index";
import { createServerClient } from "@/lib/supabase/server";
import { Separator } from "@optima/ui/separator";

export default async function AccountSettingsPage() {
  return (
    <div className="flex flex-col flex-1 gap-4 max-w-4xl">
      <AccountSettings />
    </div>
  );
}
