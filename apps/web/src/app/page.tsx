import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";

export default function Page() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col   p-4">
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
}
