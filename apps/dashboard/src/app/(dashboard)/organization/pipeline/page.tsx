import { PageTitle } from "@/components/page-title";
import { FlowWithProvider } from "@/components/providers/react-flow-provider";
import { StagesFlow } from "@/features/organization/pipeline/components/stages-flow";
import { createServerClient } from "@/lib/supabase/server";
import { getApplicationStages } from "@optima/supabase/queries";
import { Alert } from "@optima/ui/alert";
import { headers } from "next/headers";

export default async function OrganizationPipelinePage() {
  const supabase = await createServerClient();
  const headerList = await headers();
  const organizationId = headerList.get("x-organization-id");
  const { data: applicationStages, error } = await getApplicationStages(
    supabase,
    organizationId!,
  );
  if (error) {
    throw error;
  }
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
        <StagesFlow applicationStages={applicationStages} />
      </FlowWithProvider>
    </div>
  );
}
