import { UserOnboarding } from "@/features/onboarding/components/user-onboarding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Onboarding",
};

export default function UserOnboardingPage() {
  return <UserOnboarding />;
}
