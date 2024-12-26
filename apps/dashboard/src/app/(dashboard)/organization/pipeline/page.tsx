import { PageTitle } from "@/components/page-title";
import { FlowWithProvider } from "@/components/providers/react-flow-provider";
import { StagesFlow } from "@/features/organization/pipeline/stages-flow";
import { Alert } from "@optima/ui/alert";

export default function OrganizationPipelinePage() {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <PageTitle title="Design and manage your interview pipeline with customizable stages and automated triggers to streamline your hiring process." />
      <Alert variant="info">
        Good to know! The 'Rejected' stage is universal and can be paired with
        any stage in your workflow.
        <br />
        This ensures seamless candidate management, regardless of their hiring
        stage.
      </Alert>
      <FlowWithProvider>
        <StagesFlow />
      </FlowWithProvider>
    </div>
  );
}
