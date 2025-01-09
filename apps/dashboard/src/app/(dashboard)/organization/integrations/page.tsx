import { PageTitle } from "@/components/page-title";
import { FaCalendar, FaLinkedinIn, FaSlack, FaVideo } from "react-icons/fa";
import IntegrationSwitch from "./integration-switch";

const integrations: {
  name: string;
  icon: React.ReactNode;
  description: string;
  status: "connected" | "disconnected";
}[] = [
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn size={32} className="text-blue" />,
    description:
      "Connect your LinkedIn account to sync your candidates and jobs.",
    status: "connected",
  },
  {
    name: "Slack",
    icon: <FaSlack size={32} />,
    description: "Connect your Slack account to sync your candidates and jobs.",
    status: "disconnected",
  },
  {
    name: "Google Calendar",
    icon: <FaCalendar size={28} />,
    description: "Connect your Google Calendar to sync your events.",
    status: "disconnected",
  },
  {
    name: "Google Meet",
    icon: <FaVideo size={28} />,
    description: "Connect your Google Meet to sync your events.",
    status: "disconnected",
  },
];

export default function OrganizationIntegrationsPage() {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <PageTitle title="Connect and Manage Integration." className="!w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <IntegrationSwitch key={integration.name} {...integration} />
        ))}
      </div>
    </div>
  );
}
