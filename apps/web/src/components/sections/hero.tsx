import { Button } from "@optima/ui/button";
import { Input } from "@optima/ui/inputs";
import Image from "next/image";
import React from "react";
import { BorderBeam } from "../border-beam";
import { Waitlist } from "../waitlist";
import { Badge } from "@optima/ui/badge";
import { Meteors } from "@optima/ui/magic-ui";

export function Hero() {
  return (
    <header
      className="max-w-4xl mx-auto  w-full pt-32 pb-12 flex flex-col gap-4 relative overflow-hidden"
      id="hero"
    >
      <Badge variant="info" size="md" className="w-fit mx-auto">
        Building in Progress,
        <span className="hidden sm:inline">
          
          Hang tight 
        </span>
          & join the waitlist to stay tuned
      </Badge>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-left md:text-center">
        Elevate Your Recruitment Process
        <br />
        with Smart , Seamless , Modern
        <br />
        Applicant Tracking
      </h1>
      <p className="text-secondary-foreground w-2/3 md:mx-auto text-sm md:text-base lg:text-lg text-left md:text-center">
        Streamline your hiring process with our intelligent applicant tracking system that
        simplifies recruitment workflows and candidate management.
      </p>
      <Waitlist />

      <div className="relative w-full overflow-hidden rounded-md border bg-background mt-12">
        <Image
          src="/dashboard.png"
          alt="Hero Image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
      <Meteors number={50} />
    </header>
  );
}
