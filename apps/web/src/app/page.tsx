import { Navbar } from "@/components/navigations/navbar";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Icons } from "@optima/ui/icons";

export default function Page() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col   p-4">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}
