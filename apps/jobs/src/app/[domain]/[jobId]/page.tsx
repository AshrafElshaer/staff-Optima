export default async function JobPostPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return (
    <div className="flex flex-col flex-1 max-w-3xl mx-auto w-full">
      <h1>Job Post</h1>
      {jobId}
    </div>
  );
}
