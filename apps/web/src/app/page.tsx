import { Navbar } from "@/components/navigations/navbar";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Icons } from "@optima/ui/icons";

export default function Page() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col   p-4">
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
}
