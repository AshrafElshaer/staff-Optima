import { authSearchParamsCache } from "@/features/auth/auth-search-params";
import { AuthComponent } from "@/features/auth/components";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  authSearchParamsCache.parse(await searchParams);

  return (
    <main className="min-h-[100svh] w-full flex flex-col items-center justify-center ">
      <AuthComponent />
    </main>
  );
}
