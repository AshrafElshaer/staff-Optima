"use client";

import { PageTitle } from "@/components/page-title";
import { Button, buttonVariants } from "@optima/ui/button";
import {
  AccountSetting01Icon,
  Notification01Icon,
  PaintBrush04Icon,
  PreferenceHorizontalIcon,
  UserEdit01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  {
    label: "Account",
    href: "/account-settings",
    icon: AccountSetting01Icon,
    isDisabled: false,
  },
  {
    label: "Preferences",
    href: "/account-settings/preferences",
    icon: PreferenceHorizontalIcon,
    isDisabled: true,
  },
  {
    label: "Notifications",
    href: "/account-settings/notifications",
    icon: Notification01Icon,
    isDisabled: true,
  },
];


export default function AccountSettingsLayout({
  children,
}: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col flex-1 gap-8">
      <PageTitle title="Manage your account settings and preferences." />

      <nav className="flex items-center gap-2 w-full overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Button
              key={tab.href}
              variant={isActive ? "secondary" : "ghost"}
              onClick={() => router.push(tab.href)}
              disabled={tab.isDisabled}
            >
              <tab.icon size={16} strokeWidth={2} />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </nav>

      {children}
    </div>
  );
}
