import { NotificationSettings } from "@/features/user/setting/notifications/components/notification-settings";
import type { Metadata } from "next";

const metadata: Metadata = {
  title: "Notifications",
  description: "Manage your notifications settings",
};

export default function AccountSettingsNotificationsPage() {
  return <NotificationSettings />;
}
