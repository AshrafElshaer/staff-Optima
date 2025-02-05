import { JobNavigation } from "@/components/job-navigation";

export default function ApplicationPage() {
  return (
    <div className="flex flex-col flex-1 gap-4  w-full sm:col-span-5">
      <JobNavigation />
      <h1>Application</h1>
    </div>
  );
}
