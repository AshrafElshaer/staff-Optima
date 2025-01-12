import { Button } from "@optima/ui/button";
import { Input } from "@optima/ui/input";
import React from "react";

export function Hero() {
  return (
    <header className="max-w-3xl mx-auto  w-full py-40 space-y-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-left md:text-center">
        Transform Your Recruitment Process
        <br />
        with Smart , Seamless , Modern
        <br />
        Applicant Tracking
      </h1>
      <p className="text-secondary-foreground w-2/3 md:mx-auto text-sm md:text-base lg:text-lg text-left md:text-center">
        Join our exclusive waitlist to get early access to our modern applicant tracking system.
      </p>
      <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
        <Input type="email" placeholder="Email for waitlist" />
        <Button variant="default" type="button" className="min-w-fit">
          Join the waitlist
        </Button>
      </div>
    </header>
  );
}
