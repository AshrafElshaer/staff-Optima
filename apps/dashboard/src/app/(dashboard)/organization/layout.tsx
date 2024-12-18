import { userRoleEnum } from "@optima/supabase/types";
import { headers } from "next/headers";
import { forbidden } from "next/navigation";

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const accessRole = headersList.get("x-access-role");
  if (accessRole !== userRoleEnum.admin) {
    return forbidden();
  }
  return <>{children}</>;
}
