import { buttonVariants } from "@optima/ui/button";
import Link from "next/link";
export default function Forbidden() {
  return (
    <main className="flex flex-col gap-4 h-screen items-center justify-center">
      <h2 className="text-2xl font-bold">Forbidden</h2>
      <p className="text-lg">You are not authorized to access this resource.</p>
      <Link href="/" className={buttonVariants({ variant: "default" })}>
        Return Home
      </Link>
    </main>
  );
}
